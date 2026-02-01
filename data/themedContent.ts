
import { SeasonalTheme } from '../hooks/useSeasonalTheme';

// Define a type for a single theme's content
type ThemedAsset = {
  heroBackground: string;
  accentImage: string;
  quote: {
    text: string;
    cite: string;
  };
  video: {
    thumbnail: string;
    title: string;
    description: string;
  };
};

const newHeroUrl = "https://geotapmedia.com/FirstClassTaxAmbassadors/images/hero.png";

// Create a mapping of theme to assets
export const themeAssets: Record<SeasonalTheme, ThemedAsset> = {
  // Seasons
  winter: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-winter.png',
    quote: {
      text: "The future belongs to those who believe in the beauty of their dreams. Plan wisely to make them a reality, starting with your taxes.",
      cite: "Eleanor Roosevelt (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/159887/pexels-photo-159887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Navigating Tax Season's Chill",
      description: "Winter is for reflection. See how we help clients build resilient tax strategies to weather any storm and prepare for a bright spring."
    }
  },
  spring: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-spring.png',
    quote: {
      text: "An investment in knowledge pays the best interest. Let's grow your tax knowledge this spring.",
      cite: "Benjamin Franklin (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Growing Your Tax Refund",
      description: "Spring is about new beginnings. Discover our strategies for nurturing your deductions and cultivating a prosperous tax outcome."
    }
  },
  summer: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-summer.png',
     quote: {
      text: "The future is not something we enter. The future is something we create. Let's build yours today, starting with a smart tax plan.",
      cite: "Leonard I. Sweet (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Your Brightest Tax Future",
      description: "Make the most of the long summer days. Learn how we help clients accelerate their goals and build a sunny tax outlook."
    }
  },
  early_fall: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-early_fall.png',
     quote: {
      text: "Autumn shows us how beautiful it is to let things go. Let go of tax stress and let us guide you.",
      cite: "Unknown (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Harvesting the Rewards of Smart Tax Planning",
      description: "As the seasons change, it's a great time to review your tax situation. See how we help clients reap the benefits of year-long strategic tax decisions."
    }
  },
  // Holidays (will often override seasons)
  new_year: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-new_year.png',
     quote: {
      text: "The new year stands before us, like a chapter in a book, waiting to be written. Let's write a story of tax success.",
      cite: "Melody Beattie (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Your Best Tax Year Yet",
      description: "A new year means new opportunities. Watch how we help clients set and achieve ambitious tax goals."
    }
  },
  // Fix: Use 'valentines_day' to match SeasonalTheme type
  valentines_day: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-valentines.png',
    quote: {
      text: "The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart. Protect what you love with a solid tax plan.",
      cite: "Helen Keller (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "A Legacy of Security",
      description: "This Valentine's Day, give the gift of security. Learn about tax planning as the ultimate expression of care for your loved ones."
    }
  },
  st_patricks: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-st_patricks.png',
    quote: {
      text: "Luck is what happens when preparation meets opportunity. Let's prepare you for every opportunity.",
      cite: "Seneca"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/7709292/pexels-photo-7709292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Create Your Own Tax Luck",
      description: "Don't rely on a pot of gold. See how our strategic tax planning helps you build a future that's fortunate by design."
    }
  },
  easter: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-easter.png',
    quote: {
      text: "Easter is meant to be a symbol of hope, renewal, and new life. Let's renew your tax strategy.",
      cite: "Janine di Giovanni (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "A Fresh Start for Your Taxes",
      description: "Easter is a time of new beginnings. Explore how our services can bring renewed hope and growth to your tax situation."
    }
  },
  mothers_day: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-mothers_day.png',
    quote: {
      text: "A mother's love is the fuel that enables a normal human being to do the impossible. We're here to support her with smart tax advice.",
      cite: "Marion C. Garretty (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3760810/pexels-photo-3760810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Honoring Mom with a Secure Tax Future",
      description: "For the woman who gave you everything, plan a future that gives back. See how our services help build a lasting legacy with smart tax planning."
    }
  },
  fathers_day: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-fathers_day.png',
    quote: {
      text: "A father is someone you look up to no matter how tall you grow. Let's secure his legacy with expert tax help.",
      cite: "Unknown (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/4098778/pexels-photo-4098778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "The Provider's Tax Plan",
      description: "This Father's Day, we honor the providers. Learn how strategic tax planning can protect and strengthen your family's foundation for generations."
    }
  },
  patriotic: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-patriotic.png',
    quote: {
      text: "Freedom is never given; it is won. The same is true for freedom from tax stress.",
      cite: "A. Philip Randolph (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Your Declaration of Tax Independence",
      description: "Celebrate freedom by taking control of your tax future. Discover the strategies that can lead you to true tax confidence."
    }
  },
  labor_day: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-labor_day.png',
    quote: {
      text: "All labor that uplifts humanity has dignity and importance and should be undertaken with painstaking excellence.",
      cite: "Martin Luther King, Jr."
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Making Your Hard Work Count (at Tax Time)",
      description: "Your hard work deserves a strong tax plan. On Labor Day, learn how we help turn your efforts into a maximized refund."
    }
  },
  halloween: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-halloween.png',
    quote: {
      text: "There is nothing that is scarier than a missed opportunity. Don't be haunted by tax what-ifs.",
      cite: "Christina Grimmie (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Don't Be Spooked by Your Taxes",
      description: "Taxes and investments can seem scary, but they don't have to be. See how we unmask the complexities of taxes to make it a treat, not a trick."
    }
  },
  thanksgiving: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-thanksgiving.png',
    quote: {
      text: "Gratitude is the healthiest of all human emotions. The more you express gratitude for what you have, the more likely you will have even more to express gratitude for.",
      cite: "Zig Ziglar"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "A Harvest of Tax Savings",
      description: "This Thanksgiving, we're grateful for our clients. See the stories of tax success and security that we've had the privilege to be a part of."
    }
  },
  // Fix: Use 'winter_holiday' to match SeasonalTheme type
  winter_holiday: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-christmas.png',
    quote: {
      text: "The best of all gifts around any Christmas tree: the presence of a happy family all wrapped up in each other. Let's protect that gift with sound tax planning.",
      cite: "Burton Hillis (adapted)"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "The Gift of Tax Peace of Mind",
      description: "This holiday season, give a gift that lasts a lifetime. Learn how tax planning can bring peace of mind and security to your family for years to come."
    }
  },
  // Default/Fallback
  none: {
    heroBackground: newHeroUrl,
    accentImage: 'https://geotapmedia.com/VictoryDiamondFinancialServices/images/theme-none.png',
    quote: {
      text: "The hardest thing in the world to understand is the income tax.",
      cite: "Albert Einstein"
    },
    video: {
      thumbnail: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: "Our Tax Expertise in Action",
      description: "Discover how we partner with clients to file, plan, and save on their taxes through strategic planning and unwavering support."
    }
  },
};

// Function to safely get assets for a theme
export const getThemeAssets = (theme: SeasonalTheme): ThemedAsset => {
  return themeAssets[theme] || themeAssets['none'];
};
