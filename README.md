**Git repository structure**

This project's git repo structure is relatively simple, with the angular project being contained within the repo in its entirety excluding the default files that remain unadded such as the distribution angular folder. As development progress was very linear, separate branches were unnecessary. Instead the primary function of the repo has been to store changes of the application as features are implemented or the occasional bug fix.

The intent was to create a new branch with my application with all functionality outside of the groups and channels due to the fact that much existing code needed to be changes to accommodate these features. If development was incomplete before the project due date, the previous branch was to be provided. This turned out not to be necessary.

Commit history:

https://github.com/JordanWardAllen/Assignment1-3813ICT/commits/master/chat

**Data structures**

The client side form data in created and inputted through to the server side which stores the data as members of the User class. This class has many attributes such as username, email, password, userId, role, and valid which confirms the user instance is a member of the JSON file and communicates this to the client for authorization.

Though not included, the structure of the group and channel classes was to be as follows, the group class was to have attributes such as groupUserList, channelList, currentlyLoggedUserRole and contain the methods such as createGroup, removeUser, addUser, deleteGroup. The Channel class was to be a child of the Group class and in addition to the inherited methods and attributes includes attributes such as sender, chatHistory, and methods such as addChannel, removeChannel, giveUserPermisson and removeUserPermission.

 **Angular structure**

This angular project contains 2 services and 4 components. The services are the message service, which provides the functionality behind sending and receiving chat message and the register service, which provides the user authorization, deletion, create etc functionality.

The components are the chat, login, new-user and profiles components. The chat component provides the chat view for sending and storing chat history. The login component provides the user login view for user authentication. The new-user component provides the new-user form view for user creation. Lastly, the profiles view provides the super admin functions such as user deletion, permission changes as well as all users to see the list of users and some of their attributes.

The routes used are the chat, register and profiles routes as the homepage or empty string route is used for the login page. If the user is not logged in, the homepage shows the user login form but when logged in, the homepage routes to chat. Finally, while not angular explicitly, a typescript file containing the user class export is included in the angular project.

**Node server structure**

The dataExternal.json file utilised by the Node server is contained outside the server folder or src angular folder due to an issue of changes to this file leading to recompiling. The server folder contains 3 JavaScript files, server.js, socket.js and listen.js.

The server.js file contains the importing of many needed modules such as express, cores, http, socket and body-parser. This file also imports the other 2 JavaScript files which at as module extensions to the server.js file. Listen.js simply listens to the provided port to host the server. Socket.js contains all server side socket information, such as the connect function which contains all the socket event functions used throughout the application. These include message, chat, auth, user, deleteUserId, getUsers and userIdToUpgrade events.

**Routes list, return values and purpose**

Chat contains the client request inputting a message from the chat component, which is  stored in the JSON file after pushing the new message to the array and than emitted back to the chat component for display. Auth receives a user's login credentials, reads from the JSON data to determine if this user is authorized and emits the answer back to the client.

User (should be renamed to createUser) receives the new user to be created from the new-user form, writes to the JSON file. Nothing is emitted from this socket event. DeleteUserId receives the client request as a userId to deleted from the JSON file. To provide a dynamic update on page after the deletion of a user, this socket event emits the list of users back to the client.

getUser receives the client request, reads the JSON file and emits the list of users back to the client. Lastly, userIdToUpgrade simply receives the userId and currently logged in user role as a client request, searches the JSON file list of users.userId and if contained, upgrades this user's role to Super or Group admin, depending on currently logged user's roles.

Though I'm confident that the file reading code should be included as a global function and reused, due to time constraints, the existing working file read code is reused throughout the socket.js file. As of writing this, only now did I find the course contents on file writing and how it should have been completed optimally.


**REST API/ Client to server interactions**

****Personal note****
In honesty, I don't understand this being called REST API's in the marking rubric. I receive and send data through the client to the server via the sockets like we were taught last week. I don't see how or why I would use http methods to do the same functionality when sockets provide that if I understand correctly. Even if I get marked down, can I please receive feedback as to why and how to use REST API's. Thank you.


Though described above in the server section, each component sends a socket event to 1 of the 2 services, which in turn sends the client request to the specific socket event. Each event performs a task and optionally returns an emitted value back to client. This server side emitted value is received as an observable in the services and imported into the components to be displayed in the view.

Example:

Login function inputs through a form the user's login credentials. This is sent as an object

    this.credentials = { email: this.email, pwd: this.pwd}

    this.registerService.sendAuth(this.credentials);

The send Auth function emits this object to the server under the vent name 'auth'.

  public sendAuth(auth: any): void {

    this.socket.emit('auth', auth);

  }
