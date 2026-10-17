# Campus Explorer Map

Build a beautiful, fully interactive map experience for my website called **Campus Gems**.

The purpose of Campus Gems is to help university students, especially international students and students who have just moved to a new town, discover the best hidden gems around their university. These include cheap food, cafés with free Wi-Fi, quiet study spaces, student discounts, independent shops, and places that locals recommend.

**IMPORTANT: Build the actual interactive map interface now. Do not build the entire website yet. The map is the main priority. Do not create just a static map image or a visual mockup. Every map interaction described below must work.**

### 1. Map design

Create a modern, attractive, full-width interactive map using MapLibre GL JS and a real map tile provider.

Use a clean, student-friendly design with:
- A light, uncluttered map style.
- Rounded map markers with category-specific icons.
- A floating search bar at the top.
- Floating category filter buttons.
- A location button to return to the map centre.
- Zoom-in and zoom-out controls.
- A responsive layout for desktop and mobile.

Use a default development location around a university campus in Durham, England, UK. Centre the map near Durham University and the surrounding town. Allow the user to pan and zoom freely.

Use real map tiles and geographical coordinates. If map configuration is missing, explain how to configure it rather than displaying a fake map.

### 2. Interactive venue markers

Add clearly differentiated markers for these categories:
- Cheap Eats.
- Cafés and Free Wi-Fi.
- Quiet Study Spots.
- Student Deals.
- Shops and Essentials.
- Hidden Gems.
- Tourist Attractions.

For the initial demonstration, create clearly labelled sample locations with realistic coordinates around Durham city centre and the university campus. Do not present invented ratings or reviews as genuine user-submitted content.

When the user clicks a marker, open an attractive place preview card containing:
- Place name.
- Category.
- Address or location.
- Average rating, only when actual rating data exists.
- Review count, only when actual review data exists.
- A short description.
- Price indicator, when known.
- Relevant tags such as #CheapEats or #FreeWiFi.
- An optional photograph.
- A prominent “View Details” button.
- A prominent “Write a Review” button.

The selected marker should be visually highlighted. Clicking another marker must update the card.

### 3. Map search

Create a functional search bar that allows users to search for places by:
- Venue name.
- Category.
- Keywords.
- Hashtags.
- Student needs, such as cheap lunch or free Wi-Fi.

Search should filter the displayed places and markers, and selecting a search result should centre the map on the relevant location and open its preview card.

Add example search suggestions:
- “Lunch under £5”
- “Quiet place to study”
- “Cafés with free Wi-Fi”
- “Student discounts”
- “Hidden gems near the university”

For this first version, use a working local sample dataset. Keep the search logic separate so it can later connect to a real database and AI-powered search API.

### 4. Category filters

Add clickable filter chips above the map:
- All Places.
- Cheap Eats.
- Cafés.
- Study Spots.
- Student Deals.
- Shops.
- Hidden Gems.

When a user clicks a filter, update the map to show only the matching markers. Allow users to switch back to All Places.

Make the active filter visually distinct. Filtering must work with the search bar rather than resetting the entire map.

### 5. Place details panel

When the user clicks “View Details”, open a larger side panel on desktop and a bottom sheet on mobile.

Include:
- Place name and category.
- Address.
- Photograph or image placeholder.
- Description.
- Price information, if known.
- Tags.
- Reviews section.
- “Write a Review” button.

If no real reviews exist, show a helpful empty state such as “Be the first to share a tip about this place.”

The panel must close easily, and the user must be able to return to the map without losing their current map position or filters.

### 6. Write a review interaction

For this map prototype, make the “Write a Review” button open a review form associated with the selected place.

Include:
- Selected place name.
- A star rating selector from 1 to 5.
- Review title.
- Review text.
- Hashtag input.
- Photo upload control.
- Submit Review button.
- Cancel button.

For this first stage, implement a working prototype of the form with local application state. When a review is submitted, validate the required fields and immediately display the new review in the selected place's details panel. Update the displayed review count and average rating based on the submitted sample reviews.

Clearly treat these as temporary prototype reviews. Do not claim that they are saved permanently or visible to other users.

Keep the review functionality modular so that it can later be connected to Supabase authentication, PostgreSQL and persistent photo storage.

### 7. Map and list view

Add a toggle between:
- Map View.
- List View.

The list view should display the same places as the map, using cards with the place name, category, known price information and available review details.

Clicking a place in the list must centre the map on it and open its preview card when the user switches back to map view.

Search and category filters must apply consistently to both views.

### 8. User experience

Make the map feel like a real product that students would want to use.

Include:
- Smooth but restrained map interactions.
- Loading and error states.
- Empty search results with a helpful message.
- Responsive controls.
- Accessible labels and keyboard navigation.
- Clear selected-marker states.
- Useful hover effects on desktop.
- Touch-friendly controls on mobile.

Do not overcrowd the map with labels. Cluster markers at lower zoom levels when appropriate.

### 9. Technical implementation

Use:
- React and TypeScript.
- Next.js if the project supports it.
- MapLibre GL JS.
- Tailwind CSS.
- A structured sample places dataset.
- Reusable components for the map, marker preview, details panel, search bar, filters, review form and list view.

Keep place data, map rendering, search logic and review form state separate.

Do not hardcode the same place information separately in multiple components. All map markers, search results, list cards and details panels should use the same source of place data.

Use real geographical coordinates and a configurable map tile provider. Respect the provider's attribution and usage requirements.

### 10. Final result

Build and render the working interactive map immediately.

I want to be able to:
1. Open the map centred on Durham University.
2. Pan and zoom around the university and town.
3. Click different venue markers.
4. Open and close place preview cards.
5. Search for places.
6. Filter by category.
7. Switch between map and list views.
8. Open a venue's full details.
9. Click “Write a Review”.
10. Submit a prototype review and immediately see it appear in that venue's review panel.

Prioritise the interactive experience and a polished visual design. Do not implement business sponsorships, payment processing, AI search APIs, or the full authentication system yet.

**Start building the map now. Do not return only code snippets or instructions. Implement the map directly in the project and make the interactions work.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/862179ce-faa3-46fc-a77a-dd28ffa47ea5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
