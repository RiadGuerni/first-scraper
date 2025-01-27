const puppeteer= require("puppeteer");
const scrapeClothes = async () => {
  const browser = await puppeteer.launch({headless : false});
   const page = await browser.newPage();
   await page.goto("https://vintagecornerdz.com/shop");
   const showButton = "button.show-more-btn";
   page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
   // clicks the "show more" button until it is no longer available
   try {
      while (true){
        await page.waitForSelector(showButton , {timeout : 3000});
        await page.locator(showButton).click();
      
      }
   } catch (error) {
     console.log("No more button to click");
   }
  
    const scrapedClothes =await  page.$$eval("a.article-element", (products) => { 
      return products.map((product) => {
      const sold = product.querySelector(".article-header > .sold-out")?.innerText;
      const name = product.querySelector(".article-name").innerText;
      const price = product.querySelector(".article-body > p").innerText.split('-')[1].trim();
      const size = product.querySelector(".article-body > p").innerText.split('-')[0].trim();
    
      return{name,price,size , sold : sold ? true : false }}) } );
    console.log(scrapedClothes);

   


   

};
getGoogleCookies();