## Welcome To Parking Voices

A platform for road-users in the UK to voice their experiences, thoughts and opinions. This app is focused on giving the general public an outlet, and an opportunity to be heard by an online community to instigate change. https://parking-voices-seven.vercel.app/

Users can view pages with limited interactivity when signed out. Sign up and create a username to get started. Sign-in and sign-up is handled by Clerk; https://clerk.com/.

Fill in the 'Raise your voice' form and express yourself. Post your voice and watch it gain traction with Amp.

Click Amp to give power to a voice that you think deserves attention. The voice with the most Amp in the past 24 hours becomes the Voice Of The Day, and is displayed at the top of the home page.

Users can share their thoughts using comments and engage in discussion using nested replies. Click on a voice and use the forms to start a conversation.

Filter by category to cherry-pick the voices you want to see.

Keep up to date with the most recent voices on the Active Voices page.

Manage and view your voices on the profile page.

Navigate to other user's profiles by clicking on their username to see their voices.

## Deployment

Deployed with Vercel:
https://parking-voices-seven.vercel.app/

Github repo:
https://github.com/wnqifw28349/parking-voices

## Resources

We referenced the structure of the didit-example repo and created fresh code, new components, and extra functionality in order to achieve our requirements.
https://github.com/Tech-Educators/didit-reddit-upvote-example

Redirect to sign in method
https://clerk.com/docs/references/nextjs/auth#redirect-to-sign-in

Web Hooks - used to seamlessly sync user data to our database
https://clerk.com/docs/webhooks/sync-data

RadixUI - used for dynamic styling
https://www.radix-ui.com/primitives/docs/components/accordion

## User Stories

- I want to view all posts in one page, and have a separate page to view all of my posts.
- I want to sign-up/sign-in to the app so that I can interact and create posts.
- I want to like posts with a button. I want to see the like count change as I press it.
- I want to add comments to posts on dedicated pages so that my interactions are contextually tied to the content I view. I want to add comments on individual posts using a user-friendly form.
- I want to delete posts using a button on my posts page so that I can manage my content.
- As a dev, I want the app navigation to make use of redirects and refreshes so that the user experience is as smooth as possible.
- I want the app to be visually appealing and intuitive to use.

## Database Schema

![Database schema screenshot from Supabase](/public/dbschema.png)

## Wireframe

https://www.canva.com/design/DAGXNX9daoI/4_Z-pJ7xdD4tdU5VK9VFvA/view?utm_content=DAGXNX9daoI&utm_campaign=designshare&utm_medium=link&utm_source=editor

## Project Reflections

- Delete button error - dynamically control the user's ability to delete posts; when logged in, when looking at other user's posts (fixed - created a new button and separated the server function, used ternary operators for conditional rendering)
- No current user - voices and profile pages not loading if no current user (fixed - used a let and if statement to check if the user is signed in using clerk auth() object).
- Sign-in error - user not added to the database (fixed - update webhooks)
- Database query errors - no connection, undefined queries (fixed - changed db URL to ipv4, checked queries in sql editor)
- Variable errors - variables undefined in parent/child components (fixed - use props to pass variables to components)
- Deployment errors - (fixed - updating env variables and webhooks)
