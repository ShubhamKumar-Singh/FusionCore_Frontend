import React from "react";
import UsersMainView from '../Users/UsersMainView';
import ReportPanel from '../Report/ReportPanel';

export default function DashboardContent({ activeTab }: { activeTab: string }) {
  if (activeTab === "Users") {
    return <UsersMainView />;
  }
  if (activeTab === "Reports") {
    return <ReportPanel />;
  }
  if (activeTab !== "Dashboard") {
    return (
      <main style={{ padding: "30px", color: "#0c0c0cff" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>{activeTab}</h2>
        <div
          style={{
            background: "#414144ff",
            borderRadius: "10px",
            padding: "20px",
            color: "#b5b5b5",
          }}
        >
          <p>Content for {activeTab} will go here.</p>
        </div>
      </main>
    );
  }

  // Analytics data
  const analyticsData = [
    { label: "Today's Activity", value: 305 },
    { label: "This Week's Growth", value: 1005 },
    { label: "This Month's Users", value: 5505 },
    { label: "This Year's Templates", value: 155615 },
  ];

  const maxValue = Math.max(...analyticsData.map((d) => d.value));
  const yTicks = 5; // how many gridlines on Y axis
  const stepValue = Math.ceil(maxValue / yTicks);

  return (
    <main
      style={{
        flex: 1,
        paddingRight: "20px",
        color: "#f5f5f5",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <h2
        style={{
          fontSize: "30px",
          fontWeight: 800,
          marginBottom: "30px",
          color: "#272626ff",
        }}
      >
        DASHBOARD
      </h2>

      {/* Top Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {[
          { icon: "👤", title: "Users", value: "1,245" },
          { icon: "📄", title: "Templates", value: "342" },
          { icon: "💬", title: "Communications", value: "8,921" },
          { icon: "🗄️", title: "Records", value: "2,780" },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: "#1e212a",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(59,59,59,0.25)",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "#2b2e38",
              }}
            >
              {card.icon}
            </div>
            <div>
              <h3 style={{ fontSize: "15px", color: "#a8a8a8", marginBottom: "4px" }}>
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: "22px",
                  color: "#7db5b8ff",
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div
        style={{
          background: "#1a1c24",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#f5f5f5",
          }}
        >
          Fusion Analytics
        </h3>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          {analyticsData.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#2a2d36",
                padding: "15px 10px",
                borderRadius: "8px",
              }}
            >
              <h4
                style={{
                  fontSize: "22px",
                  color: "#7db5b8ff",
                  marginBottom: "5px",
                }}
              >
                ${stat.value.toLocaleString()}
              </h4>
              <p style={{ fontSize: "13px", color: "#b5b5b5" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart with Axes */}
        <div
          style={{
            width: "92%",
            height: "300px",
            background: "#2a2d36",
            borderRadius: "10px",
            boxShadow: "inset 0 1px 5px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            padding: "40px 50px 50px 60px",
          }}
        >
          {/* Y Axis Labels & Grid */}
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const yValue = maxValue - i * stepValue;
            const top = (i / yTicks) * 100;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "54px",
                  bottom: `${top}%`,
                  width: "calc(100% - 40px)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#999",
                  fontSize: "10px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "-45px",
                    bottom: "-6px",
                    color: "#aaa",
                  }}
                >
                  {yValue.toLocaleString()}
                </span>
              </div>
            );
          })}

          {/* Bars */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            {analyticsData.map((stat, i) => {
              const barHeight = (stat.value / maxValue) * 180;
              const barColor = i % 2 === 0 ? "#7db5b8ff" : "#ebadadff";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: `${barHeight}px`,
                      background: barColor,
                      borderRadius: "6px 6px 0 0",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      transition: "height 0.3s ease",
                    }}
                    title={`${stat.label}: $${stat.value.toLocaleString()}`}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* X Axis Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              bottom: "15px",
              left: "60px",
              right: "0",
            }}
          >
            {analyticsData.map((stat, i) => (
              <span
                key={i}
                style={{
                  fontSize: "12px",
                  color: "#b5b5b5",
                  textAlign: "center",
                  width: "70px",
                }}
              >
                {stat.label.split(" ")[1]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
