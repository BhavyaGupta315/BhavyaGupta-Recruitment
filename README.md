# Recruitment Website
## Features
### Sign in Page
- Zod Validation also added
- JWT Authentication
Credentials :  <br>
Username : admin <br>
Password : admin <br>

### Dashboard Page
- Protected Page.
- Displays the link on screen after clicking on button.

### Shared Page
- Publicly accessible page without login.
- Automatically fetches and displays student data.
- Includes basic email filter for easy searching.

## Flow of Application
Admin and Login Panel
![Admin and Login Flow Diagram](./public/Flow/Admin%20and%20Login%20Flow.jpg)
Shareable Data Panel
![Shareable Panel Flow Diagram](./public/Flow/Shareable%20Panel%20Flow.jpg)
### Flow Explanation (Text)

1. **Sign In**  
   Admin enters credentials (`admin` / `admin`). On successful login, the app stores the `accessToken` and `refreshToken` in `localStorage`.

2. **Dashboard Access**  
   Authenticated users are redirected to `/`, where they can `Generate a shareable token` using a button<br>
   If the access token is valid, but expired, use Refresh token to refresh the accessToken.

3. **Shared Page (`/data/token`)**  
   Anyone with the shareable link can:
   - Access the `/data` route without credentials
   - See a card layout of the given student data if the share token is correct
   - Use a basic email filter to search
## Running Locally

### Clone repo
```bash
git clone https://github.com/BhavyaGupta315/BhavyaGupta-Recruitment.git 
cd BhavyaGupta-Recruitment
```

### Install dependencies
``` bash
npm install
```
### Add .env Variable
Create a .env file in the root directory and add the following things
``` bash
JWT_SECRET=
```
### Run development server
```bash
npm run dev
```

