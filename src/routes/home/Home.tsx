/**
 * Renders the Home page.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface NewsItem {
  title: string;
  link: string;
  contentSnippet?: string;
}

interface Props {
  news: NewsItem[];
}

interface State {}


class Home extends PureComponent<Props, State> {

  public render() {
    const { news } = this.props;

    return (
      <div styleName="root">
        <div styleName="container">
          <h1 styleName="title">React.js News</h1>
          <ul styleName="news">
            {news.map((item, index) => this.renderNewsItem)}
          </ul>
        </div>
      </div>
    );
  }

  protected renderNewsItem(item: NewsItem, index: number) {
    return (
      <li key={index} styleName="newsItem">
        <a href={item.link} styleName="newsTitle">{item.title}</a>
        <span
          styleName="newsDesc"
          dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
        />
      </li>
    );
  }
}


export default withStyles(Home, require('./styles.scss'));
