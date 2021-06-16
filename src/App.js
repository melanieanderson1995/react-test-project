import {
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  CardMedia,
  Card,
  GridList,
  Typography,
  SvgIcon,
  Modal,
  Box,
  Fade,
  CardContent,
  CssBaseline,
  GridListTile,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";

import React, { Component, useEffect } from "react";
import Header from "../src/components/header";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

const styles = (theme) => ({
  root: {},
});

const ListItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "blue",
      boxShadow: "5px 5px 10px #13293D",
    },
  },
  selected: {},
})(MuiListItem);

class App extends Component {
  state = {
    loading: true,
    items: [],
    filter: "",
    open: false,
    shadow: 1,
  };

  filterSearch() {
    return this.state.items.filter((item) => {
      const fullname = item.name.first + item.name.last;
      return fullname.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  }

  renderNoMatch() {
    return (
      <div>
        <Typography style={{ fontSize: 30 }}>No matches found</Typography>
      </div>
    );
  }

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  hover = () => {
    this.setState({ shadow: 3 });
  };

  exitHover = () => {
    this.setState({ shadow: 1 });
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

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          backgroundColor: "#13293D",
        }}
      >
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
              padding: 10,
              borderRadius: 20,
              flex: 1,
              backgroundColor: "#3E92CC",
            }}
            flex={1}
          >
            <SearchBar
              style={{
                margin: 30,
                maxWidth: 300,
                flex: 1,
                backgroundColor: "#F0F0F0",
                borderRadius: 20,
              }}
              value={this.state.filter}
              onChange={(newFilter) => this.setState({ filter: newFilter })}
              onRequestSearch={() => {
                this.filterSearch();
              }}
              onCancelSearch={() => {
                this.setState({ filter: "" });
              }}
            ></SearchBar>
            <Fade
              in={!this.state.loading}
              {...(!this.state.loading ? { timeout: 1000 } : {})}
            >
              <GridList
                cellHeight="auto"
                cols={3}
                spacing={20}
                flex={1}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {this.state.filter
                  ? this.filterSearch().length == 0
                    ? this.renderNoMatch()
                    : this.filterSearch().map((item) => (
                        <ListItem
                          display="flex"
                          style={{
                            backgroundColor: "#f0f0f0",
                            margin: 5,
                            borderRadius: 20,
                          }}
                          alignItems="center"
                          justifyContent="center"
                          borderRadius={20}
                          margin={1}
                          boxShadow={this.state.shadow}
                          onMouseEnter={this.hover}
                          onMouseLeave={this.exitHover}
                          onClick={this.openModal}
                        >
                          <div>
                            <Avatar style={{ width: 100, height: 100 }}>
                              <img src={item.picture.large} />
                            </Avatar>
                          </div>
                          <div
                            style={{ flexDirection: "column", paddingLeft: 10 }}
                          >
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
                        </ListItem>
                      ))
                  : this.state.items.map((item) => (
                      <ListItem
                        display="flex"
                        style={{
                          backgroundColor: "#f0f0f0",
                          margin: 5,
                          borderRadius: 20,
                          maxWidth: 300,
                        }}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={20}
                        margin={1}
                        boxShadow={this.state.shadow}
                        onMouseEnter={this.hover}
                        onMouseLeave={this.exitHover}
                        onClick={this.openModal}
                      >
                        <Modal
                          style={{ maxWidth: 500, outline: 0 }}
                          open={this.state.open}
                          onClose={this.closeModal}
                        >
                          <Card
                            style={{
                              maxWidth: 500,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#F0F0F0",
                              borderRadius: 20,
                              padding: 20,
                            }}
                          >
                            <div
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                flex: 1,
                                backgroundColor: "yellow",
                              }}
                            >
                              <Avatar style={{ width: 100, height: 100 }}>
                                <img src={item.picture.large} />
                              </Avatar>
                              <Typography
                                style={{ textAlign: "center", fontSize: 30 }}
                              >
                                {item.name.first} {item.name.last}
                              </Typography>
                              <Typography
                                style={{ textAlign: "center", fontSize: 20 }}
                              >
                                Birthday: {item.dob.date}
                              </Typography>
                              <Typography
                                style={{ textAlign: "center", fontSize: 20 }}
                              >
                                {item.email}
                              </Typography>
                              <Typography
                                style={{ textAlign: "center", fontSize: 20 }}
                              >
                                {item.cell}
                              </Typography>
                              <Typography
                                style={{ textAlign: "center", fontSize: 20 }}
                              >
                                {item.location.street.number}{" "}
                                {item.location.street.name},{" "}
                                {item.location.city}, {item.location.state},{" "}
                                {item.location.postcode}
                              </Typography>
                            </div>
                          </Card>
                        </Modal>
                        <div>
                          <Avatar style={{ width: 100, height: 100 }}>
                            <img src={item.picture.large} />
                          </Avatar>
                        </div>
                        <div
                          style={{ flexDirection: "column", paddingLeft: 10 }}
                        >
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
                      </ListItem>
                    ))}
              </GridList>
            </Fade>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(App);
