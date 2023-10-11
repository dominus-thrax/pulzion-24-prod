import { useRouter } from "next/router";
import React, { useState } from "react";
import PrimaryButton from "./Button/PrimaryButton";
import EventCard from "./EventCard";
import headerImg from "../public/astronaut.svg";

const Tabs = ({ events }) => {


  const tabs = ["All", "Technical", "Non Technical"];
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);

  const changeTabOnClick = (index) => {
    setActiveTab(index);
  };

  let visible = events;

  if (activeTab == 0) {
    visible = events;
  } else if (activeTab == 1) {
    visible = visible.filter((event) => event.type === "Technical");
  } else {
    visible = visible.filter((event) => event.type === "Non Technical");
  }


  //console.log("Events: ")

  //console.log(events)
  return (
    <div className="tabs-body">
      <TabHeader
        data={tabs}
        click={changeTabOnClick}
        tabs={tabs}
        activeId={activeTab}
      />
      <TabContent data={visible} activeId={activeTab} router={router} />
    </div>
  );
};

class TabHeader extends React.Component {
  doClick(index, event) {
    this.props.click(index);
  }

  render() {
    let activeClass = this.props.activeId;

    let tabs = this.props.tabs.map((item, index) => {
      return (
        <li onClick={this.doClick.bind(this, index)}
          className={`${activeClass === index ? "tab-active" : ""
            } md:w-1/3 md:mx-5`}>
          <span className="text-xl">{item}</span>
        </li>
      );
    });

    return (
      <ul className="flex flex-col justify-center tabs-header md:flex-row">
        {tabs}
      </ul>
    );
  }
}

class TabContent extends React.Component {
  render() {
    return (
      <>
        {this.props?.data?.length === 0 &&
          this.props.router?.pathname === "/my_events" && (
            <div className="flex flex-col items-center justify-center w-full gap-4 mt-10 md:mt-20 md:gap-8">
              <p className="text-3xl font-bold text-center md:text-5xl text-primaries-100">
                Registered Events will be visible after verification.
              </p>
              <PrimaryButton onClick={() => this.props.router.push("/events")}>
                Register Now
              </PrimaryButton>
            </div>
          )}
        {/* <div
            className={"banner"}
            style={{
              position: "absolute",
              top: " 50%",
              left: 0,
              zIndex: -1,
            }}
          >
            <img src={headerImg.src} alt="Header Img" />
          </div> */}
        <div className="grid items-center justify-center grid-cols-1 mt-10 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-10">
          {this.props.data?.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </>
    );
  }
}

export default Tabs;
