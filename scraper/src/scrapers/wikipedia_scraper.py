from dataclasses import asdict, dataclass, field
from typing import Optional, List, Tuple
from lxml import html
import re
import json

import requests


@dataclass
class Link:
    url: str
    label: Optional[str] = None


@dataclass
class Tag:
    label: str
    parent: Optional[str] = None


@dataclass
class Formula:
    id: str
    text: str

    @dataclass
    class Meta:
        title: str
        links: Optional[List[Link]] = None
        description: Optional[str] = None
        tags: Optional[Tag] = field(
            default_factory=lambda: [],
        )

    meta: Meta
    src: Optional[str] = None

class RecordWriter:
    def write(self, id: str, data: dict) -> None:
        pass


class LocalRecordWriter(RecordWriter):
    __output_dir: str

    def __init__(self, output_dir: str = "output"):
        self.__output_dir = output_dir


    def write(self, id: str, data: dict) -> None:
        with open(
            f"{self.__output_dir}/{id}.json",
            "a",
        ) as f:
            f.write(f"{json.dumps(data)}\n")


class WikipediaScraper:
    __starting_url: str
    __record_writer: RecordWriter
    __base_url: str = "https://en.wikipedia.org"

    def __init__(
        self,
        starting_url: str,
        record_writer: RecordWriter = LocalRecordWriter(),
    ) -> None:
        self.__starting_url = starting_url
        self.__record_writer = record_writer


    def run(self, tags: Optional[List[str]] = None) -> None:
        urls = [self.__starting_url]
        visited_pages = set()

        while len(urls) > 0:
            urls_to_visit = [*urls]
            urls = []

            for url in urls_to_visit:
                if url in visited_pages:
                    continue

                content = self.__get_url_contents(url)

                if not content:
                    continue

                tree = html.fromstring(content)
                formulas = self.__get_formulas(tree)

                if len(formulas) == 0:
                    visited_pages.add(url)
                    continue

                description = self.__get_description(url)
                links = self.__get_links(tree)
                internal_links = [
                    Link(
                        url=formula.id,
                        label=formula.meta.title,
                    )
                    for formula in formulas
                ]

                for formula in formulas:
                    formula = Formula(
                        src=url,
                        text=formula.text,
                        id=formula.id,
                        meta=Formula.Meta(
                            title=formula.meta.title,
                            description=description,
                            links=internal_links,
                            tags=[Tag(label=tag) for tag in (tags or [])],
                        ),
                    )
                    self.__record_writer.write(
                        formula.id,
                        asdict(formula),
                    )
                
                for link in links:
                    if link.url in visited_pages:
                        continue

                    urls.append(link.url)

                visited_pages.add(url)


    def __get_url_contents(self, url: str) -> Optional[str]:
        response = requests.get(url)
        if response.status_code != 200:
            return None
        
        return response.content


    def __parse_formula_text(self, text: str) -> Tuple[str, str]:
        title = re.sub(
            r"\s\s*",
            " ",
            re.sub(
                r"[^\w\s]",
                "",
                text.split("=")[0].split('{')[-1],
            ).rstrip(" ")
        )
        id = re.sub(
            r"[^\w]",
            "-",
            re.sub(r"[^\w\s]", "", title.lower()),
        )

        if len(title) <= 2 or len(id) <= 2:
            raise ValueError()
        if "displaystyle" in f"{title}{id}":
            raise ValueError()

        return [id, title]


    def __get_formulas(self, tree) -> List[Formula]:
        formulas = []

        for text in tree.xpath(
            '//img[contains(@alt, "displaystyle")]',
        ):
            try:
                text = text.attrib['alt']
                [id, title] = self.__parse_formula_text(text)
                formulas.append([id, title, text])
            except Exception:
                pass

        for text in tree.xpath(
            '//span[contains(@class, "texhtml")][0]',
        ):
            try:
                text = text.text
                [id, title] = self.__parse_formula_text(text)
                formulas.append([id, title, text])
            except Exception:
                pass

        return [
            Formula(
                text=text,
                id=id,
                meta=Formula.Meta(title=title),
            )
            for [id, title, text] in formulas
        ]

    def __get_description(self, url: str) -> Optional[str]:
        try:
            page_title = url.split("/wiki/")[1]
            response = requests.get(
                f"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles={page_title}"
            )

            if response.status_code != 200:
                return None
            
            return list(
                response.json()["query"]['pages'].values(),
            )[0]["extract"]
        except Exception:
            return None

    def __get_links(self, tree) -> List[Link]:
        links = []
        for url in tree.xpath(
            '//h2[./*[contains(text(),"See also")]]/following-sibling::ul[1]/*/a',
        ):
            url = url.attrib['href']
            try:
                links.append(
                    Link(
                        label=re.sub(r"\_", "", re.split(r"wiki/", url)[1]),
                        url=f"{self.__base_url}/{url.lstrip('/')}",
                    ),
                )
            except Exception:
                pass
        return links
