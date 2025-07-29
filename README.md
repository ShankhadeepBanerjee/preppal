# PrepPal - AI Interview Practice Platform
<p>
  PrepPal is an AI-powered platform designed to help job seekers practice and perfect their interview skills. With realistic AI interviewers and detailed feedback, users can build confidence and improve their performance before the real interview.
</p>
<img width="1080" height="720" alt="image" src="https://github.com/user-attachments/assets/bee227f9-9431-4a09-a76f-a70121181d16" />
<p></p>



## 🌟 Key Features

- **AI-Powered Interviews**: Practice with realistic AI interviewers that simulate real job interviews
- **Voice-Based Interaction**: Natural conversation flow using voice recognition technology
- **Personalized Feedback**: Detailed AI-generated feedback on your interview performance
- **Tech Stack Specific Questions**: Interviews tailored to your chosen technology stack
- **Performance Analytics**: Track your progress over time with detailed metrics
- **User Authentication**: Secure sign-up and login functionality
- **Interview History**: Access to past interviews and feedback

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI Integration**: Vapi.ai for voice conversations
- **Authentication**: Firebase Authentication
- **Backend**: Firebase Firestore for data storage
- **Validation**: Zod for schema validation
- **Forms**: React Hook Form
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- pnpm (package manager)
- A Firebase account
- A Vapi.ai account

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ShankhadeepBanerjee/preppal.git
cd preppal
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
GOOGLE_GENERATIVE_AI_API_KEY

NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_VAPI_API_KEY
NEXT_PUBLIC_VAPI_WORKFLOW_ID
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 Usage

1. **Sign Up/Sign In**: Create an account or log in to access the platform
2. **Create an Interview**: Navigate to the "Create an Interview" section and select your desired role, tech stack, and experience level
3. **Practice Interview**: Click "Start Interview" to begin practicing with the AI interviewer
4. **Receive Feedback**: After completing the interview, get detailed feedback on your performance
5. **Review History**: Access your past interviews and feedback in the dashboard

## 🏗️ Project Structure

```
app/
  ├── (auth)/           # Authentication pages (sign-in, sign-up)
  ├── (root)/           # Main application pages
  │   ├── interview/    # Interview-related pages
  │   └── ...           # Other main pages
  └── api/              # API routes
components/             # Reusable UI components
constants/              # Application constants
firebase/               # Firebase configuration
lib/                    # Utility functions and SDK integrations
public/                 # Static assets
types/                  # TypeScript type definitions
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

