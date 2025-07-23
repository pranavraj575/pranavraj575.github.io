// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "github repositories",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repos/";
          },
        },{id: "nav-animal-photos",
          title: "animal photos",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/aminals/";
          },
        },{id: "dropdown-research-statement",
              title: "research statement",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/research-statement";
              },
            },{id: "dropdown-social-profiles",
              title: "social profiles",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/social-profiles";
              },
            },{id: "dropdown-infinite-load-spell",
              title: "infinite load spell",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/infinite-loop";
              },
            },{id: "dropdown-run-3",
              title: "run 3",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://www.coolmathgames.com/0-run-3";
              },
            },{id: "post-high-quality-wildlife-photography",
        
          title: "high-quality wildlife photography",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/cat/";
          
        },
      },{id: "post-meevis",
        
          title: "meevis",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/meebis/";
          
        },
      },{id: "post-jinx",
        
          title: "jinx",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/jinx/";
          
        },
      },{id: "news-making-a-website",
          title: 'Making a website',
          description: "",
          section: "News",},{id: "news-starting-mld-phd-at-cmu",
          title: 'Starting MLD PhD at CMU',
          description: "",
          section: "News",},{
          id: 'social-email',
          title: 'email',
          section: 'Socials',
          handler: () => {
            window.open("mailto:%70%72%61%6A%62%68%61%6E@%61%6C%75%6D%6E%69.%63%6D%75.%65%64%75", "_blank");
          },
        },{
          id: 'social-github',
          title: 'GitHub',
          section: 'Socials',
          handler: () => {
            window.open("https://github.com/pranavraj575", "_blank");
          },
        },{
          id: 'social-linkedin',
          title: 'LinkedIn',
          section: 'Socials',
          handler: () => {
            window.open("https://www.linkedin.com/in/pravna", "_blank");
          },
        },{
          id: 'social-orcid',
          title: 'ORCID',
          section: 'Socials',
          handler: () => {
            window.open("https://orcid.org/0009-0004-4933-5204", "_blank");
          },
        },{
          id: 'social-researchgate',
          title: 'ResearchGate',
          section: 'Socials',
          handler: () => {
            window.open("https://www.researchgate.net/profile/Pranav-Rajbhandari/", "_blank");
          },
        },{
          id: 'social-scholar',
          title: 'Google Scholar',
          section: 'Socials',
          handler: () => {
            window.open("https://scholar.google.com/citations?user=9WoH1FoAAAAJ", "_blank");
          },
        },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'abomination-theme',
      title: 'Burn your retinas',
      description: 'Change the theme of the site to Abomination',
      section: 'Theme',
      handler: () => {
        setThemeSetting("abomination");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
