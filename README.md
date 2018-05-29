[![Waffle.io - Columns and their card count](https://badge.waffle.io/Kauri-2018/pro-bono.svg?columns=all)](https://waffle.io/Kauri-2018/pro-bono) 
# Pro-bono
## Introduction
Pro-bono is a web application created for the Auckland Community Law Centre by students of the Enspiral Dev Academy as their final project. It was made by a team of 4 ([Sarah McLaughlin](https://github.com/sarah-mclaughlin), [Cameron Probert](https://github.com/CameronProbert), [Kale Hembrow](https://github.com/meakommo) and [Zoe Barron](https://github.com/Zoealexandra)) over 7 days, with efforts being made to continue the project after the end of the Enspiral Dev Academy bootcamp.

## To Test
### Website
It is deployed on heroku - http://pro-bono-test.herokuapp.com
Feel free to register an account and then log in as an admin to approve your new account. Usernames and passwords for the default accounts are [here](#logins).
If you choose to test on the web application we ask that you keep any submissions to the site clean and appropriate. There is no filtering of inappropriate text and other users will be using the site after you.

### Locally
#### For Linux
1. Clone from github using `git clone https://github.com/Kauri-2018/pro-bono.git`
2. Ensure __Node__ is running version 9.11.0 using `node -v`
    * If you have the wrong node version
      1. Install __nvm__ using `sudo apt install nvm`
      2. Run `nvm install 9.11.0` to install the correct node version, or if it already installed, run `nvm use 9.11.0`
3. Rename the `.env.example` file in the base directory to `.env`
    * If you wish, you may change the `SESSION_SECRET` and `JWT_SECRET` keys to any value.
    * If you have your own MailGun API key you can edit the `MAILGUN_API_KEY` key to use your own. This will allow you to receive an email confirmation when your account is approved by an admin.
4. Run `yarn` to install packages
    * If __Sodium__ does not build run `sudo apt install automake autoconf libtool`
5. Run the seed files for the database with `yarn knex seed:run`
    * If the database did not set up correctly for some reason run `yarn knex migrate:latest && yarn knex seed:run`
6. Start the server using `yarn start`
7. Connect to the server using the web browser of your choice at `localhost:3000`

### Logins
There are 3 default accounts - one for each priviledge level

|Priveledge Level|Username|Password|
|---             |---     |---     |
|Admin           |admin   |admin   |
|Member          |member  |member  |
|Lawyer          |lawyer  |lawyer  |
