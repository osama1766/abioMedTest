# DonationTracker

This is just a UI project. There is no backend or database linked to this project.
The data is fetched from a static json file (under assets directory). The data is not saved back to the json file.

The project uses Angular, D3 library and Material UI
To run the project:
    Install git
    Clone this repo
    Install node
    Install angular CLI
    Run "npm i"
    Run 'ng server' command under the root directory
    open 'http://localhost:4200' in your browser

The home page displays some information about the company and a D3 library piechart which shows information about donation status
There are nagivation button on the top right of the screen.
The user can click on the "Donate" button if willing to donate to the needy
On the donation page the user enters the desired donation amount and clicks on the submit button
A pie chart with the updated information is displayed
Please note that the data is not being saved back to the json file, so if you try to donate again it may not display accurate data. If you are willing to use this functionality again please navigate to home screen and then navigate back to the donation page.