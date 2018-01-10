![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# WDI-30 Project 2 - Women's Services

I created an app to rate women's services (Pregnancy Support, Sexual Health & Contraception, Domestic & Sexual Abuse) to enable women to choose a service not solely based on location but on how they were treated and the quality of advice they received. I integrated full CRUD functionality for users and focused primarily on the user registration/login functionality, and aggregate rating functionality.

This is a full-stack, RESTful Express app built using Node.js, MongoDB, JavaScript, EJS, SCSS and Bootstrap. It has been designed with mobile in mind and is responsive.


##### [Visit website](https://womens-services.herokuapp.com/)

---

###### After initial brainstorming and discussing the idea with others, I spent time wireframing. This was incredibly helpful to understand the flow of the website. It was also at this stage that I decided that given the nature of the problem it was important for all information to be available to non-members. The authentication process is reserved for creating a new service, comment and rating.

<img src="https://i.imgur.com/7XtUfQ8.png" width="700">


######  Once a service is selected a list of services is displayed with the top rated first. There is also the option to add a new service so that the network of services is ever-growing. The address is slide-toggled.

<img src="https://i.imgur.com/WbnqMr2.png" width="700">

###### Once clicked, each service page presents the user with the data from all ratings submitted, as well as each comment.

<img src="https://i.imgur.com/YH4BjU5.png" width="700">

###### If logged in the user will also be able to rate and comment on each service. They will also be authenticated to delete there comments.

<img src="https://i.imgur.com/kRDahCB.png" width="700">

---

I was pleased to create my first fully RESTful app and would love to develop this further as my skillset increases.

Ideas to further develop the application include:

- Use google maps API to display locations
- Filter by distance to
- Improve the look and feel of the website with styling and animation to make it look young and fun and less like a council website.
