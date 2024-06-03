include .env
export

scrape:
	python3 formulast_scraper_cli.py \
		--starting-url=https://en.wikipedia.org/wiki/Return_on_equity \
		--tags Accounting

clean:
	rm -rf target/

.env:
	echo "" > .env
