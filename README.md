# Social Media API

## Description

This project involves building the API for a social media application. The project includes building the server using Node.js/Express and connecting it to a MongoDB using Mongoose. The Models, routes, and Controllers will be created to meet the provided project specifications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This project may be installed on a local server by cloning the repository at : https://github.com/melliott7264/social-media-api and installing all the dependencies by executing "npm install". Start the server with 'npm start'. The API can then be accessed using an application like Insomnia. There are 14 routes defined.

## Usage

The 14 routes are as follows:

Users:

GET All and POST at /api/users

GET One, PUT, and Delete at /api/users/:userId

JSON for POST/PUT
{
"username":"",
"email":""
}

Friends:

POST at /api/users/:userId/friends

JSON for POST
{
"username":"",
"email":""
}

Delete at /api/users/:userId/friends/:friendId

Thoughts:

GET All at /api/thoughts

POST at /api/thoughts/:userId

GET One, and PUT at /api/thoughts/:thoughtId

JSON for POST/PUT
{
"thoughtText":"",
"username":""
}

Delete at /api/thoughts/:thoughtId/:userId

Reactions:

POST at /api/thoughts/:thoughtId/reactions

JSON for POST
{
"reactionBody":"",
"username":""
}

DELETE at /api/thoughts/:thoughtId/reactions/:reactionId

Walk-through Videos:

Users: https://youtu.be/8GqdLEVPlMk

Friends: https://youtu.be/Kbb1Wl1Xf8A

Thoughts: https://youtu.be/Eb3rgo8I-qI

Reactions: https://youtu.be/S_TZ_5FX5eQ

Bonus: https://youtu.be/1YlEmGE-MFs

## Credits

Mark Elliott https://github.com/melliott7264

## License

Copyright (c) 2022 Mark Elliott

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
