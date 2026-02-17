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
          
        },{id: "nav-infinite-load-spell",
          title: "infinite load spell",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/infinite-loop/";
          },
          
            silly: true,
          
        },{id: "dropdown-research-statement",
              title: "research statement",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/research-statement";
              },
              
            },{id: "dropdown-links-contact-info",
              title: "links/contact info",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/links-contact";
              },
              
            },{id: "dropdown-personal-info",
              title: "personal info",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/personal-info";
              },
              
                silly: true,
              
            },{id: "dropdown-run-3",
              title: "run 3",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://www.coolmathgames.com/0-run-3";
              },
              
                silly: true,
              
            },{id: "dropdown-comment-section",
              title: "comment section",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/comment-section";
              },
              
                silly: true,
              
            },{
          id: 'social-email',
          title: 'email',
          section: 'Socials',
          handler: () => {
            window.open("mailto:%70%72%61%6A%62%68%61%6E@%63%73.%63%6D%75.%65%64%75", "_blank");
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
      description: 'Change the theme of the site to Light theme',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
        // BLINDING
        // only triggers when the toggle button is hit (or when searched for), rather than whenever light theme is on
        if (determineStepsFound() > 1){
            setStepsFound(1);
        }
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark theme',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default theme',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },
    {
      id: 'abomination-theme',
      title: 'Burn your retinas',
      description: 'Change the theme of the site to Abomination theme',
      section: 'Theme',
      handler: () => {
        setThemeSetting("abomination");
        //FOUND SECRET
        increaseStepsTo(2);
      },
    },{id: "post-molly",
        
          title: "molly",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/molly/";
          
        },
      },{id: "post-thanksgiving-miracle",
        
          title: "thanksgiving miracle",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/thanksgiving_miracle/";
          
        },
      },{id: "post-oh-deer",
        
          title: "oh deer",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/oh_deer/";
          
        },
      },{id: "post-high-quality-wildlife-photography",
        
          title: "high-quality wildlife photography",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/cat/";
          
        },
      },{id: "post-bird",
        
          title: "bird",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/birb/";
          
        },
      },{id: "post-roos",
        
          title: "roos",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2025/roo/";
          
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
      },{id: "post-ralph",
        
          title: "ralph",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/aminals/2024/ralph/";
          
        },
      },{id: "news-making-a-website",
          title: 'Making a website',
          description: "",
          section: "News",},];

list_of_category_lists = [[],
    [],[],
    [],[{id: "category-aminals-cat-egory",
            title: 'cat-egory',
            description: "cat-egory",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/cat-egory";
            },
          },{id: "category-aminals-dog-egory",
            title: 'dog-egory',
            description: "dog-egory",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/dog-egory";
            },
          },{id: "category-aminals-cat-egory",
            title: 'cat-egory',
            description: "cat-egory",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/cat-egory";
            },
          },{id: "category-aminals-dog-egory",
            title: 'dog-egory',
            description: "dog-egory",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/dog-egory";
            },
          },{id: "category-aminals-birb",
            title: 'birb',
            description: "birb",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/birb";
            },
          },{id: "category-aminals-cat-egory",
            title: 'cat-egory',
            description: "cat-egory",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/cat-egory";
            },
          },{id: "category-aminals-dog-egory",
            title: 'dog-egory',
            description: "dog-egory",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/dog-egory";
            },
          },{id: "category-aminals-birb",
            title: 'birb',
            description: "birb",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/birb";
            },
          },{id: "category-aminals-cat-egory",
            title: 'cat-egory',
            description: "cat-egory",
            section: "aminals categories",
            handler: () => {
              window.location.href = "/aminals/category/cat-egory";
            },
          },],
    [],[],
    [],];

for (let category_list of list_of_category_lists){
  //count occurrences of each tag
  countegory_thingies = {};
  for (let cat_egory of category_list){
    if (!(cat_egory.id in countegory_thingies)){
      countegory_thingies[cat_egory.id] = 0;
    }
    countegory_thingies[cat_egory.id] += 1;
  }

  // deduplicate ids
  for (i = 0; i < category_list.length; i++){
    for (j = i + 1; j < category_list.length; j++){
      if (category_list[i].id == category_list[j].id){
        category_list.splice(j, 1); // splice removes the spliced element from list for some reason
        j -= 1;
      }
    }
  };

  // sort by occurrence
  category_list.sort(function(a,b){return countegory_thingies[b.id]-countegory_thingies[a.id];});

  // concatenate
  ninja.data = ninja.data.concat(category_list);

  // remove silly elements if we are serious geese
  for (i = 0; i < ninja.data.length; i++){
    if (ninja.data[i].silly && determineGooseSetting(determineStepsFound())=="serious"){
        ninja.data.splice(i, 1); // splice removes the spliced element from list for some reason
        i -= 1;
    }
  };
}
