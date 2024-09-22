import {
  LayoutDashboard,
  Dumbbell,
  Calendar,
  ClipboardList,
  Utensils,
  Apple,
  Users,
  LucideIcon,
  Home,
  Activity,
  CookingPot,
  CreditCard,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getAdminMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Overview",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutDashboard,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Fitness Programs",
      menus: [
        {
          href: "/admin/workout-plans",
          label: "Workout Plans",
          active: pathname.includes("/workout-plans"),
          icon: Dumbbell,
          submenus: [],
        },
        {
          href: "/admin/exercise",
          label: "Exercise Library",
          active: pathname.includes("/exercise-library"),
          icon: ClipboardList,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Nutrition",
      menus: [
        {
          href: "/admin/nutrition-plans",
          label: "Nutrition Plans",
          active: pathname.includes("/nutrition-plans"),
          icon: Utensils,
          submenus: [],
        },
        {
          href: "/admin/meals",
          label: "Meals",
          active: pathname.includes("/meals"),
          icon: CookingPot,
          submenus: [],
        },
        {
          href: "/admin/food-database",
          label: "Food Database",
          active: pathname.includes("/food-database"),
          icon: Apple,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Administration",
      menus: [
        {
          href: "/admin/subPlans",
          label: "Plans Managements",
          active: pathname.includes("/subPlans"),
          icon: CreditCard,
          submenus: [],
        },
        {
          href: "/admin/user-management",
          label: "User Management",
          active: pathname.includes("/user-management"),
          icon: Users,
          submenus: [],
        },
      ],
    },
  ];
}

export function getUserMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Overview",
      menus: [
        {
          href: "/dashboard",
          label: "Home",
          active: pathname === "/dashboard",
          icon: Home,
          submenus: [],
        },
        {
          href: "/dashboard/my-progress",
          label: "My Progress",
          active: pathname.includes("/my-progress"),
          icon: Activity,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Fitness",
      menus: [
        {
          href: "/dashboard/workouts",
          label: "Workouts",
          active: pathname.includes("/workouts"),
          icon: Dumbbell,
          submenus: [],
        },
        {
          href: "/dashboard/sessions",
          label: "Training Sessions",
          active: pathname.includes("/sessions"),
          icon: Calendar,
          submenus: [],
        },
        {
          href: "/dashboard/community",
          label: "Community",
          active: pathname.includes("/community"),
          icon: Users,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Nutrition",
      menus: [
        {
          href: "/dashboard/mymealplan",
          label: "My Nutritioin Plan",
          active: pathname.includes("/mymealplan"),
          icon: Utensils,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/dashboard/settings",
          label: "Account settings",
          active: pathname.includes("/settings"),
          icon: Users,
          submenus: [],
        },
      ],
    },
  ];
}
