'use client';

import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';
import { Users, UserPlus, BookMarked, GitCommit } from 'lucide-react';
import Reveal from './Reveal';

export default function GithubSection() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('https://api.github.com/users/RobbyAH')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(console.error);
  }, []);

  return (
    <section id="github" className="section">
      <div style={{ width: '100%' }}>
        <Reveal>
          <div className="section-label">{language === 'id' ? 'Aktivitas GitHub' : 'GitHub Activity'}</div>
          <h2 className="text-3xl font-bold mb-8 font-inter" style={{ fontSize: 'var(--text-3xl)' }}>
            {language === 'id' ? 'Kontribusi & Statistik' : 'Contributions & Stats'}
          </h2>
        </Reveal>

        <div className="github-bento-grid">
          <Reveal delay={100} style={{ height: '100%' }}>
            <div className="bento-card" style={{ height: '100%', padding: '32px' }}>
              {profile ? (
                <div className="github-profile-bento">
                  <div className="github-profile-header">
                    <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="github-avatar-wrapper">
                      <div className="github-avatar-glow"></div>
                      <img src={profile.avatar_url} alt="GitHub Avatar" className="github-avatar-new" />
                    </a>
                    
                    <div className="github-profile-info">
                      <h3 className="github-name-new">
                        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {profile.name || 'Robby Ardiansyah Hudaya'}
                        </a>
                      </h3>
                      <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="github-username-new">
                        @{profile.login}
                      </a>
                    </div>
                  </div>

                  <div className="github-stats-row">
                    <div className="github-stat-col">
                      <span className="github-stat-num">{profile.public_repos}</span>
                      <span className="github-stat-lbl">Repos</span>
                    </div>
                    <div className="github-stat-divider"></div>
                    <div className="github-stat-col">
                      <span className="github-stat-num">{profile.followers}</span>
                      <span className="github-stat-lbl">Followers</span>
                    </div>
                    <div className="github-stat-divider"></div>
                    <div className="github-stat-col">
                      <span className="github-stat-num">{profile.following}</span>
                      <span className="github-stat-lbl">Following</span>
                    </div>
                  </div>

                  <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="nav-cta github-btn" style={{ textAlign: 'center', boxSizing: 'border-box' }}>
                    {language === 'id' ? 'Kunjungi Profil' : 'View Profile'}
                  </a>
                </div>
              ) : (
                <div className="github-loading" style={{ textAlign: 'center' }}>Loading...</div>
              )}
            </div>
          </Reveal>

          <Reveal delay={200} style={{ height: '100%' }}>
            <div className="bento-card" style={{ height: '100%', padding: '32px', overflowX: 'auto' }}>
              <div className="github-calendar-bento">
                {mounted ? (
                  <GitHubCalendar 
                    username="RobbyAH" 
                    colorScheme={theme === 'dark' ? 'dark' : 'light'}
                    labels={{
                      totalCount: language === 'id' ? '{{count}} kontribusi dalam setahun terakhir' : '{{count}} contributions in the last year',
                    }}
                    style={{
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                ) : (
                  <div style={{ height: '150px' }} />
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
