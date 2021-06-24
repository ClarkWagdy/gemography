import React, { Component } from "react";
import axios from "axios";
import "./Home.css";
import Load from "../Load/Load";
class Home extends Component {
  state = { items: {}, totalnum: 0, load: true, nmofpage: 1 };
  async componentDidMount() {
    await axios
      .get(
        `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${this.state.nmofpage}`
      )
      .then((res) => {
        const items = res.data.items;

        this.setState({
          items: items,
          totalnum: res.data.total_count,
          load: false,
        });
      });
  }

  changepage = async (num) => {
    const n = parseInt(this.state.totalnum / 30) + 1;
    const nmpage = this.state.nmofpage + num;
    if (nmpage >= 1 && nmpage <= n) {
      await this.setState({ nmofpage: nmpage, load: true });
      this.componentDidMount();
    }
  };
  render() {
    if (this.state.load) {
      return <Load />;
    } else {
      return (
        <React.Fragment>
          <div className="container p-4">
            <div className="row justify-content-center ">
              <svg
                height="32"
                viewBox="0 0 16 16"
                fill="white"
                version="1.1"
                width="32"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </div>
            {/* repos */}
            {this.state.items.map((ele, ind) => {
              return (
                <div key={ind} className="row align-items-center my-3">
                  <div className="col-3 col-xl-1 me-xl-3 p-0 m-0">
                    <img
                      src={ele.owner.avatar_url}
                      className="repoimg"
                      alt=""
                    />
                  </div>
                  <div className="col-9 col-xl-10 p-0 m-0 ">
                    <h5 className="p-0 m-0  font-weight-bold">{ele.name}</h5>
                    <p className="p-0 m-0 ">{ele.description}</p>
                    <p className="p-0 m-0 mt-2">
                      <span className="shape">
                        Stars: {ele.stargazers_count}
                      </span>{" "}
                      <span className="shape">
                        {" "}
                        Issues: {ele.open_issues_count}
                      </span>{" "}
                      Submitted 30 days by {ele.owner.login}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* end repos */}
            <div className="row text-center ">
              <p className="p-0 m-0">Page Number</p>
              <p>
                <i
                  className="arrow fas fa-chevron-left"
                  onClick={() => this.changepage(-1)}
                ></i>{" "}
                {this.state.nmofpage}{" "}
                <i
                  className="arrow fas fa-chevron-right"
                  onClick={() => this.changepage(1)}
                ></i>
              </p>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Home;
