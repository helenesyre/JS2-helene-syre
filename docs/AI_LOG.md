## AI LOG

### Before brief change (dates are approximate)

#### Page structure recommendation and navigation setup

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 11 February 2026 |
| Purpose: | Logic of login, register and profile if logged in or not. Setup a temporary navigation component i can edit easily for every page. |
| Outcome: | Recommendation for what the pages should be. I ended up with a individual page for login and register, and a profile page that is only accessible if logged in. It also helped with a temporary setup for linking navigation and main.js so it was on every page. This has later been completly changed. |

#### Placement of aside element based on semantic rules

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 11 February 2026 |
| Purpose: | I wanted to know the placement of aside based on semantic rules |
| Outcome: | The aside element does not have to be placed inside of `<main>`, allowing for a more flexible layout options. |

#### Filling remaining width with Tailwind classes

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 11 February 2026 |
| Purpose: | Fill the rest of the width with Tailwind. I didn't know how to do it initially, since the Tailwind classes could be a bit tricky to combine. |
| Outcome: | Managed to adjust the element width using Tailwind classes, and achieving the desired layout. It just added flex to the inner divs also. |

#### Hover state in Tailwind

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 11 February 2026 |
| Purpose: | Does the hover: have to be added for each hover state in Tailwind |
| Outcome: | Yes, it cannot be grouped with other states. |

#### Setting Roboto as main font in Tailwind project

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 11 February 2026 |
| Purpose: | Set Roboto as the main font in a Tailwind project |
| Outcome: | Tried multiple times to fix it, but was unsuccessful. First it tried to add it to the Tailwind configuration, then make a normal css class (multiple times). I ended up troubleshooting myself and finding a better solution. |

#### Debugging form submission issue in JavaScript code

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 12 February 2026 |
| Purpose: | I had problem registering a user, first problem was the form wouldn't trigger. After that the submit didn't work, so I asked it to find what was making the issue. |
| Outcome: | I went back and forth aloth with the trigger to find out what the real problem was. It made a attachRegisterFormListener() to the register. I then found out my form didn't submit because i forgot to add names to the different inputs. |

#### Correctly adding elements in code

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 13 February 2026 |
| Purpose: | How can i correctly add my getAllPosts() so it works as expected? |
| Outcome: | I didn't end up using this example, but it told me to call getAllPosts() to fetch the posts. And then pass the post data to my postcard component. It also gave me an example how to add the objects. This worked at first but i completly changed it later because i needed another setup to make it work. |

#### Handling undefined values in API response for post likes and metadata

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 15 February 2026 |
| Purpose: | Likes come out as undefined, why is that? I also wanted examples for image and created/updated time. |
| Outcome: | First off I had wrote it wrong, and learned I should set it up with reactions since its an array and not an object with a count property. It told me to sum the count values, and I found a solution for this. It gave me examples for image and created/updated time, I took it as inspiration but didn't use them directly in my code. |

#### Making a button open a modal

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 15 February 2026 |
| Purpose: | How to make my button open my modal? |
| Outcome: | It gave me a solution to use id with a eventlistener. I Kinda did that, but ended up making a useModal and an eventlistener to make it work. So i didnt use the recommended approach from Copilot. |

#### Closing modal on button click

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 15 February 2026 |
| Purpose: | I couldn close my button in the modal, but it worked it i just added text and not svg. |
| Outcome: | I actually found out that the issue was with the SVG element, but adding .closest() fixed it. |

#### Handling unique IDs for post pages

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 16 February 2026 |
| Purpose: | I was wondering the best way to handle unique IDs for post pages. AI recommended handlig this in routes. I had trouble with my API call only returning the data and meta property. |
| Outcome: | I started off with handling it like they suggested, but then I found a better approach and redid my whole router so this solution has since changed. For the API call, it recommended me to use a setup to check if the data exists. I then implemented a check to ensure the data exists before proceeding. This worked. |

---

### After brief change

#### Debugging typeerror in JavaScript code

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 18 February 2026 |
| Purpose: | Explanation of JavaScript promises to clarify async data handling |
| Outcome: | It explained the error on the userdata link in Navigation.js to clarify issue. I got provided clear explanations of JavaScript promises and the specific error in Navigation.js, helping to clarify what caused the error and how to fix it. This made it possible for me to fix it without asking it how to fix it. |

#### Button styling on tab switch

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 20 February 2026 |
| Purpose: | I had a solution from earlier that didn't work since I'm not switching hashes. Therefor i asked what they would recommend to solve it. I already did some research and knew it should have been a forEach() where the classes gets added or removed. |
| Outcome: | It provided a good explanation and example of how to dynamically update the button styles based on the selected tab, which helped me implement the desired functionality. |

#### Closing modal on edit button click

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 20 February 2026 |
| Purpose: | I wanted the dropdown menu to close when the edit button is clicked. |
| Outcome: | It provided a good explanation and example of how to close the modal when the edit button is clicked, which helped me implement the desired functionality. |

#### Removing event listener on page switch

| Topic | Details |
| --- | --- |
| Tool used: | Copilot |
| Date: | 21 February 2026 |
| Purpose: | One of the event listners triggered on other pages on scroll. So I asked how to remove the event listner on page switch. |
| Outcome: | It provided me with a wrong solution, but I came up with a correct approach on my own which was checking what page I was on. |
