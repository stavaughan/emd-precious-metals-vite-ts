# Precious Metal Scrap Valuation Tool

Introducing a straightforward, easy-to-use calculator that accurately determines the market value of your scrap gold, platinum, and silver jewelry, helping you confidently sell your old pieces and obtain their full worth.

## Using the Precious Metal Scrap Valuation Tool

1. Click the "Rotate" icon to retrieve real-time spot prices for gold, platinum, and silver.
2. Select the desired metal type (e.g., gold) and quality (e.g., 18K), then input the metal weight in grams for the first item.
3. Press "Calculate" to generate a comprehensive table outlining the item's description and market value.
4. Add more items as necessary, uploading an image for each in the designated area.
5. Review the automatically calculated total market value and, if applicable, total weight for items of the same metal and quality.
6. Click "Print" to obtain a hard copy or save your results as a PDF.

## Project Description

Introducing an efficient application leveraging React, Redux, TypeScript, and Vite to deliver a seamless experience for users seeking to evaluate scrap jewelry metal's market value. This app retrieves real-time spot prices for gold, platinum, and silver in troy ounces, allowing users to calculate their assets' worth by inputting weight, metal type, and metal quality.

Additionally, users can upload, resize, and crop images for each item, while storing the data conveniently in their browser's local storage. With just a click, generate a professionally formatted PDF of the saved data.

Initially built using Express JS and JavaScript for personal use, this app evolved into a more extensive MERN stack application. Now, we present the latest iteration as an accessible, stand-alone app, harnessing the power of Vite and TypeScript for enhanced type safety.

## How to use the App

1. Click `Update Metal Prices` to fetch current prices via API. Once spot prices are displayed, you're ready to input data.
2. The dealer "concession" toggles default to a 10% value, reflecting the buyer's profit margin as a percentage of net value. The calculated values of items already in the results table automatically change as the toggles are pressed.
3. Choose the metal type from the dropdown (options: Gold, Silver, Platinum).
4. Select the metal quality from the dropdown, with options based on your chosen metal type (e.g., gold in karats like 14k, silver in fine or sterling).
5. Input your item's weight in grams using the provided text field. `Calculate` and `Clear` buttons will appear after entering the weight.
6. After clicking "Calculate," a results section and toolbar will appear, enabling you to save data to local storage, print the data, or save it as a PDF. You can also upload, resize, crop, and change image formats.
7. Each result item will feature an image upload element for attaching an image to that specific item.

## Knowledge

### Example - Calculating the value of a gold ring

To determine the scrap gold price of a `12.3 gram, 14k gold ring`, begin by converting the gold weight from grams to troy ounces (oz-t), with one troy ounce equivalent to `31.1034768 grams`.

>_variables_:
>
>`ozt` = designator for troy ounces
>
>`Wsg` = scrap weight in grams (_i.e._ 12.3 grams)
>
>`Wst` = scrap weight in troy ounces
>
>_formula_: $\ Wst = { Wsg \over 31.1034768 } $
>
>$$\ Wst = { Wsg \over 31.1034768 } $$
>
>_example_: `Total Weight of scrap gold (ozt)`
>
>$$\ Wst = { 12.3grams \over 31.1034768 } $$
>
>$$\ Wst = 0.3955ozt$$

Having converted the scrap weight to troy ounces, we must now account for the actual weight of pure gold, as `14k` indicates a percentage of gold alloyed with other metals like nickel or copper. Commonly used in gold jewelry, `14k` represents a lower purity than `24k`, which signifies ~99.99% pure gold.

To ascertain the pure gold content in the ring, apply the following formula:

>_variables_:
>
>`k` = numerical _karat_ in gold quality (i.e. 14)
>
>`kr` = quality ratio
>
>_formula_:
>
>$$\ kr = { k \over 24 } $$
>
>_example_ : `ratio of gold in scrap`
>
>$$\ kr = { 14 \over 24 } $$
>
>$$\ kr = .58333$$

We can use the following formula to determine the weight of pure gold in the ring:

>_variables_:
>
>`Wp` = Weight in troy ounces of pure gold in scrap
>
>_formula_:
>
>$$\ Wp = kr \times Wst $$
>
>_example_: `Weight of pure gold in scrap`
>
>$$\ Wp = 0.58333 \times 0.3955$$
>
>$$\ Wp = 0.2307ozt$$

Finally, to compute the scrap gold price of the ring, simply multiply the weight of the pure gold by the prevailing market price for gold. Assuming a hypothetical gold price of `$1,923.34` per troy ounce, employ the subsequent formula:

>_variables_:
>
>`Gs` = Gold spot price per troy ounce in USD (i.e. $1,923.34)
>
>`Vn` = Net scrap value in USD
>
>_formula_:
>
>$$\ Vn = Wp \times Gs $$
>
>_example_: `Net Value of Scrap Gold`
>
>$$\ Vn = 0.2307ozt \times \$1,923.34$$
>
>$$\ Vn = \$443.71$$

#### Final Step

Following the calculations above, the scrap gold's market value is determined to be $443.71. To liquidate your scrap gold, consider selling to a reputable precious metals dealer or jeweler. Be mindful that dealers aim to profit, so they will charge a fee or "concession"—usually represented as a percentage of the metal's value. To secure the best offer, conduct research to identify a buyer who provides a fair spread and accurately evaluates your metal's quality and weight. By inputting your anticipated spread, you can estimate the amount you'll likely receive for your scrap gold before engaging with a buyer.

## Screenshots

![Desktop 1](frontend/src/globals/images/desktop-0.png "Desktop 1")

[sample price results in pdf](/frontend/src/globals/images/sample-metals-price-sheet.pdf)

![Mobile 1](/frontend/src/globals/images/mobile-01.png "Mobile 1")

![Mobile 2](/frontend/src/globals/images/mobile-1a.png "Mobile 2")

![Mobile 3](/frontend/src/globals/images/mobile-1.png "Mobile 3")

![Mobile 4](/frontend/src/globals/images/mobile-2.png "Mobile 4")

## Requirements

- Node.js version 16 or higher
- npm version 6 or higher

## Getting started

### Clone the GitHub repository

```bash
$git clone git@github.com:stavaughan/emd-precious-metals-vite-ts.git
```

### CD to root directory

```bash
$cd emd-precious-metals-vite-ts
```

### Install dependencies backend

```bash
$npm install
```

### Install dependencies frontend

```bash
$cd frontend && npm install
```

### Start the development server

```bash
$cd.. && npm start
```

### Build the application

```bash
$cd frontend && npm run build:dev
```

Once the frontend static file has been compiled you can deploy your app on your favorite server. Follow their instructions as they may differ from the previous step:

## Contributing

We welcome contributions to the project. If you would like to contribute, please follow our [contribution guidelines](http://localhost:5173).

## License

The project is licensed under the [BSD 3-Clause License](LICENSE) License.

## Contact

LinkedIn: [www.linkedin.com/in/stephenavaughan](https://www.linkedin.com/in/stephenavaughan/)

twitter: [@Stephen26503352](https://twitter.com/Stephen26503352)
