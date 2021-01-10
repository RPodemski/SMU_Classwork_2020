from splinter import Browser
from bs4 import BeautifulSoup as bs
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import datetime
import time

class ScrapeMars():
    def __init__(self):
        pass

    def init_browser(self):
        executable_path = {'executable_path': ChromeDriverManager().install()}
        browser = Browser('chrome', **executable_path, headless=False)
        return browser


    def scrape_info(self):
        dataScraped = {}
        browser = self.init_browser()

        #NASA News

        url = "https://mars.nasa.gov/news/"
        browser.visit(url)
        time.sleep(1)

        soup = bs(browser.html)
        slide = soup.find("li", {"class": "slide"})
        nTitle = slide.find("div", {"class": "content_title"}).text.strip()
        nPar = slide.find("div", {"class": "article_teaser_body"}).text.strip()

        #Mars Space Images

        base = "https://www.jpl.nasa.gov"
        url2 = f"{base}/spaceimages/?search=&category=Mars"
        browser.visit(url2)
        time.sleep(1)

        browser.find_by_id("full_image").click()
        time.sleep(1)

        browser.find_link_by_partial_text("more info").click()
        time.sleep(1)

        soup = bs(browser.html)
        img = soup.find("img", {"class": "main_image"})

        featImgURL  = base + img["src"]

        #Mars Facts
        url3 = "https://space-facts.com/mars/"
        browser.visit(url3)
        time.sleep(1)

        dfs = pd.read_html(browser.html)
        df = dfs[0]
        df.columns = ["Statistic", "Value"]
        mFacts = df.to_html(index=False)

        #Hemisphere Data

        base = "https://astrogeology.usgs.gov"
        url4 = f"{base}/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
        browser.visit(url4)
        time.sleep(1)

        soup = bs(browser.html)
        links = soup.find("div", {"class": "results"}).findAll("a", {"class": "itemLink"})

        realLinks = []
        for link in links:
            image = link.find("img")
            if (image):
                realLinks.append(base + link["href"])

        #Grabbing Image Info
        hemData = []
        for realLink in realLinks:
            browser.visit(realLink)
            time.sleep(1)
            
            soup = bs(browser.html)
            url5 = soup.find("ul").find("li").find("a")["href"]
            hTitle = soup.find("h2", {'class', "title"}).text.split(" Enhanced")[0]
            
            hemData.append({"title": hTitle, "url": url5})

        browser.quit()

        dataScraped["news_title"] = nTitle
        dataScraped["news_par"] = nPar
        dataScraped["featured_image_url"] = featImgURL
        dataScraped["mars_facts"] = mFacts
        dataScraped["hemispheres"] = hemData
        dataScraped["last_updated"] = datetime.datetime.now()

        return dataScraped
