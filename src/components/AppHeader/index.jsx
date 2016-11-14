
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'components/Link';
import Navigation from 'components/Navigation';
import s from './style.scss';
import logo from './logo-small.png';

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation className={s.nav} />
        <Link className={s.brand} to="/">
          <img src={logo} width="38" height="38" alt="React" />
          <span className={s.brandText}>Your Company</span>
        </Link>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>React</h1>
          <p className={s.bannerDesc}>Complex web apps made easy</p>
        </div>
      </div>
    </div>
  );
}

export default withStyles(Header, s);
