const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fetch = require('cross-fetch');
const fs = require('fs-extra');

let testResults = [];

async function testNegativeScenario() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    let result = {};

    // Navigate to the frontend URL
    await driver.get('http://localhost:8080');

    // Validate the message using getByRole attribute
    await driver.wait(until.elementLocated(By.xpath('//h1[contains(text(), "Hello, World!")]')), 10000);
    let headingElement = await driver.findElement(By.xpath('//h1[contains(text(), "Hello, World!")]'));
    await driver.wait(until.elementIsVisible(headingElement), 10000);

    // Validate the message using innerText attribute
    let h1Text = await headingElement.getText();
    result.testName = 'Negative Scenario Test';
    result.status = (h1Text === 'Hello, World!') ? 'Pass' : 'Fail';
    result.message = `Expected: 'Hello, World!', Actual: '${h1Text}'`;

    testResults.push(result);
  } catch (error) {
    console.error('Error in Negative Scenario Test:', error);
    result.testName = 'Negative Scenario Test';
    result.status = 'Error';
    result.message = error.toString();
    testResults.push(result);
  } finally {
    await driver.quit();
  }
}

// Running the tests
async function runTests() {
  await testNegativeScenario();

  // Generate HTML report
  generateHTMLReport();
}

// Function to generate HTML report
function generateHTMLReport() {
  let htmlContent = `
  <html>
    <head>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .pass {
          background-color: #9CCC65;
        }
        .fail {
          background-color: #EF9A9A;
        }
        .error {
          background-color: #FFEB3B;
        }
      </style>
    </head>
    <body>
      <h2>Selenium Test Results</h2>
      <table>
        <tr>
          <th>Test Name</th>
          <th>Status</th>
          <th>Message</th>
        </tr>
  `;

  testResults.forEach(result => {
    let statusClass = '';
    if (result.status === 'Pass') {
      statusClass = 'pass';
    } else if (result.status === 'Fail') {
      statusClass = 'fail';
    } else {
      statusClass = 'error';
    }

    htmlContent += `
      <tr class="${statusClass}">
        <td>${result.testName}</td>
        <td>${result.status}</td>
        <td>${result.message}</td>
      </tr>
    `;
  });

  htmlContent += `
      </table>
    </body>
  </html>
  `;

  fs.writeFileSync('selenium_test_results.html', htmlContent);
  console.log('HTML report generated: selenium_test_results.html');
}

// Execute tests and generate report
runTests().catch(err => console.error('Test execution error:', err));