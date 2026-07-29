from playwright.sync_api import sync_playwright
import time
import os


def press(keys, delay=0.1):
    for k in keys:
        page.keyboard.press(k)
        time.sleep(delay)


DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with sync_playwright() as p:
    # open page
    print("opening page")
    browser = p.firefox.launch()
    page = browser.new_page()
    page.goto("https://pranavraj575.github.io/repos")

    # turn on dark mode
    print("darkening the mode")
    page.keyboard.down("Control")
    page.keyboard.press("k")
    page.keyboard.up("Control")
    press("dark")
    page.keyboard.press("Enter")

    # scroll to self reference
    print("scrolling to recursion")
    thing = page.get_by_text("pranavraj575/pranavraj575.github.io")
    thing.scroll_into_view_if_needed()
    # page.mouse.wheel(0,-69)

    # let any animations pass
    print("getting the good cycle")
    time.sleep(20)
    page.screenshot(path=os.path.join(DIR, "assets", "img", "stuff", "repo_screenshot.png"), full_page=False)
    browser.close()
