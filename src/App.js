import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  CardMedia,
  Card,
  GridList,
  Typography,
  SvgIcon,
} from "@material-ui/core";
import React, { Component, useEffect } from "react";
import Header from "../src/components/header";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

const styles = (theme) => ({
  root: {
    backgroundColor: "red",
  },
});

class App extends Component {
  state = {
    loading: true,
    items: [],
    filter: "",
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=24&nat=us")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          items: response.results,
          loading: false,
        });
      });
  }

  filterSearch() {
    return this.state.items.filter((item) => {
      const fullname = item.name.first + item.name.last;
      return fullname.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ backgroundColor: "blue" }}>
        <div>
          <Header></Header>
        </div>
        {this.state.loading && (
          <div>
            <Typography style={{ fontSize: 30 }}>Loading...</Typography>
          </div>
        )}
        {!this.state.loading && (
          <div
            style={{
              margin: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchBar
              style={{ margin: 30, maxWidth: 300 }}
              value={this.state.filter}
              onChange={(newFilter) => this.setState({ filter: newFilter })}
              onRequestSearch={() => {
                this.filterSearch();
              }}
            ></SearchBar>
            <GridList
              className={classes.root}
              cellHeight="auto"
              cols={5}
              spacing={5}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              {this.state.filter
                ? this.filterSearch().map((item) => (
                    <Card
                      style={{
                        flexDirection: "row",
                        padding: 20,
                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Avatar style={{ width: 100, height: 100 }}>
                          <img src={item.picture.large} />
                        </Avatar>
                      </div>
                      <div style={{ flexDirection: "column", paddingLeft: 10 }}>
                        <Typography style={{ fontSize: 20 }}>
                          {item.name.first} {item.name.last}
                        </Typography>
                        <Typography style={{ fontSize: 12 }}>
                          {item.location.city}, {item.location.state}
                        </Typography>
                        <Typography style={{ fontSize: 12 }}>
                          {item.email}
                        </Typography>
                      </div>
                    </Card>
                  ))
                : this.state.items.map((item) => (
                    <Card
                      style={{
                        flexDirection: "row",
                        padding: 20,
                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Avatar style={{ width: 100, height: 100 }}>
                          <img src={item.picture.large} />
                        </Avatar>
                      </div>
                      <div style={{ flexDirection: "column", paddingLeft: 10 }}>
                        <Typography style={{ fontSize: 20 }}>
                          {item.name.first} {item.name.last}
                        </Typography>
                        <Typography style={{ fontSize: 12 }}>
                          {item.location.city}, {item.location.state}
                        </Typography>
                        <Typography style={{ fontSize: 12 }}>
                          {item.email}
                        </Typography>
                      </div>
                    </Card>
                  ))}
            </GridList>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(App);
