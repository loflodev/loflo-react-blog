import { DraftIcon } from "../../assets/svg/DraftIcon";
import { PublishIcon } from "../../assets/svg/PublishIcon";
import { SubscriberIcon } from "../../assets/svg/SubscriberIcon";
import { ViewIcon } from "../../assets/svg/ViewsIcon";

export const DashboardStats = () => {
  const dashcarInfo: DashcarInfoProps[] = [
    {
      icon: <SubscriberIcon />,
      count: 500,
      title: "Suscriber",
      subtile: "Active sucriber today: 10%",
    },
    {
      icon: <ViewIcon />,
      count: 10000,
      title: "Views",
      subtile: "Most view all time",
    },
    {
      icon: <PublishIcon />,
      count: 50,
      title: "Articles",
      subtile: "Number of article published",
    },
    {
      icon: <DraftIcon />,
      count: 15,
      title: "Draft",
      subtile: "Number of article in draft",
    },
  ];
  return (
    <div className="d-cards">
      <div className="card-container">
        {dashcarInfo.map((cardinfo) => (
          <Dashcard
            icon={cardinfo.icon}
            count={cardinfo.count}
            title={cardinfo.title}
            subtile={cardinfo.subtile}
          />
        ))}
      </div>
    </div>
  );
};

export interface DashcarInfoProps {
  icon: JSX.Element;
  count: number;
  title: string;
  subtile: string;
}

export const Dashcard = ({ icon, count, title, subtile }: DashcarInfoProps) => {
  return (
    <div className="dcard py-4 px-8 border rounded-md shadow">
      <div className="pl-1">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="font-extrabold text-2xl">{count}</p>
      <p className="pt-4 text-sm">{subtile}</p>
    </div>
  );
};
