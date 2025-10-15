import React from 'react';
type DashboardContentProps = {
  activeTab: string;
};

export default function DashboardContent({ activeTab }: DashboardContentProps): JSX.Element {
  if (activeTab !== 'Dashboard') {
    return (
      <main className="dashboard-content"  style={{ padding: '1%' }}>
        <h2>{activeTab} Overview</h2>
        <p>Content for {activeTab} will go here.</p>
      </main>
    );
  }
  return (
    <main className="dashboard-content">
      <h2>Dashboard Overview</h2>
      <div className="cards">
        <div className="card">
          <h3>New Visits</h3>
          <p>57,820</p>
        </div>
        <div className="card">
          <h3>Purchases</h3>
          <p>$89,745</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <p>178,391</p>
        </div>
        <div className="card">
          <h3>Returned</h3>
          <p>32,592</p>
        </div>
      </div>
      <section className="stats-section">
        <h3>Acquisition Channels</h3>
        <div className="stats-list">
          <div className="stat-item">
            <span>Search Engines</span>
            <span>+22%</span>
          </div>
          <div className="stat-item">
            <span>Referral Traffic</span>
            <span>+70%</span>
          </div>
          <div className="stat-item">
            <span>Direct Traffic</span>
            <span>+38%</span>
          </div>
          <div className="stat-item">
            <span>Ad Campaigns</span>
            <span>+17%</span>
          </div>
        </div>
      </section>
    </main>
  );
}
