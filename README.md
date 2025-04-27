## Playwright Automation Tests for ParaBank

### Project Overview

This repository contains Playwright (TypeScript) automation tests created as part of a learning exercise on the ParaBank website (https://parabank.parasoft.com/).


### Getting Started

1. Clone the repository:
   ```git clone https://github.com/mdziegielewska/Automation-Playwright.git```

2. Install dependencies
    ```npm install ci```

3. Run tests
    ```npx playwright test```


### Technologies Used

- Playwright
- TypeScript


### Test Coverages

- Main page
    - [x] Menu
    - [x] Navigation buttons
    - [x] Services
    - [x] Latest news
- [x] Footer 
- [x] Registration
- [x] Log in
    - [x] Forgotten password
- [x] Log out
- [x] Customer care
- [x] Account services
    - [x] Open new account
    - [x] Account ovierview
    - [x] Transfer funds
    - [x] Bill pay
    - [x] Update contact info
    - [x] Request loan 
    - [x] Find transaction 


### Future work

- Session cookies preservation to eliminate the need to log in every time before testing account services
- Extend test coverage with new scenarios
- More optimalization
