import argparse
import os
import sys
import logging
from typing import List

from src.scrapers import WikipediaScraper

__version__ = "0.1.0"

logging.getLogger(__name__).setLevel(logging.INFO)


class FormulastScraperCli:
    """Scrape sources for job postings and candidates"""

    def __init__(self):
        self.__arg_parser = argparse.ArgumentParser(
            description=FormulastScraperCli.__doc__,
        )
        self.__arg_parser.set_defaults(func=self.version)
        self.__arg_parser.add_argument(
            "--starting-url",
            type=str,
            help="Starting URL",
        )
        self.__arg_parser.add_argument(
            "--tags",
            type=str,
            help="Tags",
        )

    @staticmethod
    def version(*_args):
        """Current CLI version"""
        return "formulast-%s", __version__

    def main(self) -> int:
        """Pull values from the environment and run the CLI"""
        args = self.__arg_parser.parse_args()
        WikipediaScraper(
            starting_url=args.starting_url,
        ).run(
            tags=args.tags.split(",") if args.tags else None,
        )



if __name__ == "__main__":
    FormulastScraperCli().main()
