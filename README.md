![HCMUS Canteen management system logo](./images/logo.png)

# HCMUS Canteen Management

If you are my team member, you are free to use this repo. If not please contact us for permission.

## Get started

Please follow the steps below:

### ⏳ Installation

1. Use **yarn** to install the project. [Install yarn with these docs](https://yarnpkg.com/lang/en/docs/install/).

   ```bash
   npm install --global yarn
   ```

   ```bash
   yarn --version # if any, you are good to go
   ```

2. Clone this project to your local environment
   ```bash
   git clone https://github.com/tmphat1312/ise-canteen-management.git canteen-mg-system
   ```
3. Open the cloned project on the terminal and make sure you are at the root directory of the repo
   ```bash
   cd canteen-ms-system
   ```
4. Add missing environment variables files
   I will not provide any guide at this step.

   - **.env for** server
   - **.env.local** for client

   Where to find those files? **Please contact us**

   - Place **.env** in the `backend` directory
   - Place .env.local in the `client` directory

5. Install packages
   You have to have 2 terminal tabs to achieve step 5, and 6 (make sure they are in the same root directory of the cloned repo)
   - On the first terminal
     ```bash
     cd client && yarn
     ```
   - On the second one
     ```bash
     cd backend && yarn
     ```
6. Start the dev servers
   - On the first terminal
     ```bash
     yarn dev
     ```
   - On the second one
     ```bash
     yarn start
     ```
7. Open your browser and type `localhost:5173` or hit `o` on the client-server terminal (`yarn dev` terminal)

### 🖐 Requirements

**Supported operating systems**:

- Windows 10/11
- We have not tested on any other OS

**Node:** version 20.0.0 or later

## Team members

- 21120505 - Trần Đức Minh
- 21120515 - Trần Phước Nhân
- 21120519 - Lê Thanh Phát
- 21120521 - Nguyễn Phúc Phát
- 21120524 - Trương Minh Phát

## Why does this repo exist?

This repo hosts code for the Introduction to Software Engineering course project.

## License

You will not have any permission to use this code without our consent
