# 🚀 Robby Ardiansyah Hudaya - Personal Portfolio

A modern, interactive personal portfolio designed to showcase the journey, skills, and projects of **Robby Ardiansyah Hudaya**, a passionate UI/UX Designer & Web Developer.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ Features

- **Modern & Interactive UI**: Engaging animations, scroll-triggered reveals, and a dynamic marquee hero section.
- **Bilingual Support (EN/ID)**: Seamless toggle between English and Indonesian languages using cookies to prevent hydration mismatches.
- **Dark/Light Mode**: Integrated theme toggle perfectly adapted for reading in any environment.
- **GitHub Bento Integration**: Live fetching of GitHub contribution stats and profile info directly via the GitHub API.
- **Fully Responsive**: Flawless layout adapting gracefully from ultra-wide desktops down to mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Library**: [React.js](https://reactjs.org/)
- **Styling**: Vanilla CSS (`globals.css`) with custom CSS Variables for theming.
- **Icons**: Lucide React
- **Hosting**: Vercel (Recommended)

## 📂 Folder Structure

```text
RA-Portfolio/
├── app/
│   ├── api/            # API Routes (e.g., coffee counter, github stats)
│   ├── work/           # Detailed projects/works page
│   ├── globals.css     # Global styles & design system tokens
│   ├── layout.jsx      # Root layout (Theme & Language Providers)
│   └── page.jsx        # Main landing page
├── components/
│   ├── DigitalGallery.jsx
│   ├── FeaturedProjects.jsx
│   ├── GithubSection.jsx
│   ├── Header.jsx
│   ├── LanguageProvider.jsx
│   ├── LanguageToggle.jsx
│   ├── Portfolio.jsx   # Core Hero & About section
│   ├── TechnicalArchive.jsx
│   ├── ThemeProvider.jsx
│   └── ...
├── lib/
│   └── projects.js     # Projects data & information
├── public/
│   ├── documents/      # Resume / CV (PDF)
│   ├── images/
│   │   ├── certificates/
│   │   ├── profile/
│   │   └── projects/
│   └── favicon.svg
├── next.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/RobbyAH/RA-Portfolio.git
cd RA-Portfolio
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 👨‍💻 Developer Credits

This website was designed and developed with ❤️ by:

### **Muhammad Rafly Romeo Nasution**
*Information Systems Student (Semester 7) at Gunadarma University*

<p align="left">
  <a href="https://raflyromeo-portfolio.vercel.app/">
    <img src="https://img.shields.io/badge/Rafly%20Romeo%20Portfolio-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Rafly Romeo Portfolio" height="30"/>
  </a>
  <a href="https://linkedin.com/in/muhammadraflyromeonasution">
    <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" height="30"/>
  </a>
  <a href="https://instagram.com/rfly.romeo_">
    <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" alt="Instagram" height="30"/>
  </a>
  <a href="mailto:raflyromeonasution07@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" height="30"/>
  </a>
</p>

> *"Thank you for trusting me to bring your digital portfolio to life, Robby. It was an absolute pleasure working on this project!"* — **Romeo**

---

<p align="center">
  <small>© 2026 Robby Ardiansyah Hudaya. All Rights Reserved.</small>
</p>
