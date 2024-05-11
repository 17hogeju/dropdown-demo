# Demo app for reusable dropdown component

The reusable dropdown has the following features:
- A user can open and close the dropdown menu by clicking on the dropdown button or outside the menu
- The component supports a single selection option or multiple selected options
- A user can select or deselect all options at once on a multiselect dropdown
- The selected option is visible on the dropdown button when the menu is open and closed


This demo showcases using the same component with each configuration. It shows a table of sample data for text moderation. The user can use the first dropdown to filter data by severity level. The user can additionally use the second multiselect dropdown to filter data that matches any of the selected classes. Once the user has chosed their desired filters, they can press `Apply Filters` to see the resulting data with the filters applied.



This app is built using a `React` framework and is written in `JavaScript`.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for testing purposes.

### Prerequisites
If you don't already have them, you'll need to isntall the following:
- [Node.js](https://nodejs.org/en/download/current)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


### Installation

1. **Clone the respository**
    ```
    git clone https://github.com/17hogeju/dropdown-demo
    ```
2. **Navigate to the project directory**
    ```
    cd dropdown-demo
    ```
3. **Install dependencies**
    ```
    npm install
    ```
4. **Run the development server**
    ```
    npm start
    ```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo app.


## Future considerations

Given the limited amount of time that I had for this assessment, I prioritized the features that were in the assignment doc. However, here are a few improvements that I thought of:
- Adding test cases to ensure the behavior is correct and as intended and there are no unexpected errors.
- Being able to pass in the data without having to transform it to an array of string beforehand.
- Adding the index to the drop down option keys to ensure that "option a" and "option-a" do not generate the same key.
- Adding a prop in the dropdown component that can provide an option such that the dropdown options can be of any type and not limited to single select and multi-select.
