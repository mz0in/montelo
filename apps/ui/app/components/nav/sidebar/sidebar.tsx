import { Link, useLoaderData, useLocation, useNavigate, useParams } from "@remix-run/react";
import { BookOpenText, GanttChart, Home, LayoutDashboard } from "lucide-react";
import { Routes } from "~/routes";
import { EnvLayoutLoader } from "~/types/envLayout.loader.types";
import { MouseEventHandler } from "react";

const SidebarItems = [
  {
    name: "Dashboard",
    href: Routes.app.project.env.dashboard,
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Logs",
    href: Routes.app.project.env.logs,
    icon: <GanttChart size={20} />,
  },
];

const BottomSidebarItems = [
  {
    name: "Documentation",
    href: Routes.external.documentation,
    icon: <BookOpenText size={20} />,
  },
];

export const Sidebar = () => {
  const { project } = useLoaderData<EnvLayoutLoader>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const envId = params.envId!;

  const navigateToRoot: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(Routes.app.root);
  };

  const SidebarItemsComponent = () => SidebarItems.map((item) => {
    const params = {
      envId,
      projectId: project.id,
    };
    return (
      <li key={item.name}>
        <Link
          to={item.href(params)}
          prefetch={"intent"}
          className={`flex items-center py-2 px-4 rounded-lg hover:underline underline-offset-2 ${
            pathname === item.href(params) ? "underline" : ""
          }`}
        >
          <div className="flex justify-center w-8">
            {item.icon}
          </div>
          <span className="ml-2 whitespace-nowrap">{item.name}</span>
        </Link>
      </li>
    );
  });

  const BottomItemsComponent = () => BottomSidebarItems.map((item) => (
    <li key={item.name}>
      <Link
        to={item.href}
        target={"_blank"}
        prefetch={"intent"}
        className={`flex items-center py-2 px-4 rounded-lg hover:underline underline-offset-2 ${
          pathname === item.href ? "underline" : ""
        }`}
      >
        <div className="flex justify-center w-8">{item.icon}</div>
        <span className="ml-2 whitespace-nowrap">{item.name}</span>
      </Link>
    </li>
  ));

  return (
    <aside className="w-52 h-screen fixed left-0 top-0 flex flex-col" aria-label="Sidebar">
      <div className="p-4">
        <img className="h-8 w-auto mb-4" src={"/logo.png"} alt="Logo" />
      </div>
      <div className="overflow-y-auto flex-grow">
        <ul className="space-y-2">
          <SidebarItemsComponent />
        </ul>
      </div>
      <div className="mt-auto">
        <ul className="space-y-2 mb-4">
          <BottomItemsComponent />
        </ul>
        <div className={"flex-row items-center pt-2 px-4 rounded-lg mb-4"}>
          <p className={"text-sm text-muted-foreground font-light my-1"}>Project: {project.name}</p>
          <p className={"text-sm text-muted-foreground font-light my-1"}>Team: {project.team.name}</p>
          <Link to={Routes.app.root} prefetch={"intent"} className={"flex items-center hover:underline"}>
            <Home size={16} className="mr-2 h-4 w-4" /> Home
          </Link>
        </div>
      </div>
    </aside>
  );
};
