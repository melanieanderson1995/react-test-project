import {
  Avatar,
  Card,
  GridList,
  Typography,
  Modal,
  Fade,
  IconButton,
  Divider,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";
import React, { Component } from "react";
import Header from "../src/components/header";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

const styles = (theme) => ({
  background: { backgroundColor: "#13293D" },
  iconButtonLeft: {
    float: "left",
    color: "#3E92CC",
  },
  iconButtonRight: {
    float: "right",
    color: "#3E92CC",
  },
  infoText: { textAlign: "center", fontSize: 20 },
  list: {
    alignItems: "center",
    justifyContent: "center",
  },
  listAvatar: {
    width: 100,
    height: 100,
  },
  listBackground: {
    margin: 30,
    padding: 10,
    borderRadius: 20,
    flex: 1,
    backgroundColor: "#3E92CC",
  },
  listInfo: {
    fontSize: 12,
  },
  listInfoDiv: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  listName: {
    fontSize: 20,
  },
  modal: {
    position: "absolute",
    flex: 1,
    left: "50%",
    maxWidth: 500,
    outline: 0,
    margin: 50,
  },
  modalCard: {
    maxWidth: 500,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    padding: 20,
    left: "50%",
    top: "50%",
    transform: "translateY(-50%)",
    transform: "translateX(50%)",
    flex: 1,
  },
  modalInfo: {
    padding: 10,
  },
  nameText: { textAlign: "center", fontSize: 30 },
  search: {
    marginBottom: 15,
    maxWidth: 325,
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
  },
});

const ListItem = withStyles({
  root: {
    "&:hover": {
      boxShadow: "5px 5px 10px #13293D",
    },
    backgroundColor: "#f0f0f0",
    margin: 5,
    borderRadius: 20,
    maxWidth: 325,
  },
})(MuiListItem);

class App extends Component {
  // loading is a boolean that describes if the information is loading
  // items is an array that holds the retrieved users
  // filter is a string that describes the currently inputted filter
  // open is a boolean that describes if the modal is open or not
  // itemIndex is a number that describes the index of the currently clicked
  // on item
  state = {
    loading: true,
    items: [],
    filter: "",
    open: false,
    itemIndex: 0,
  };

  /**
   * filterSearch returns a filtered list of people based on the filter input.
   */
  filterSearch() {
    return this.state.items.filter((item) => {
      const fullname = item.name.first + item.name.last;
      return fullname.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  }

  /**
   * renderNoMatch renders the element shown when no matches are found for the search
   * filter.
   * @returns an element that says there were no matches
   */
  renderNoMatch() {
    return (
      <div>
        <Typography style={{ fontSize: 30 }}>No matches found...</Typography>
      </div>
    );
  }

  /**
   * openModal opens the modal that displays the information from the clicked on user.
   * @param {*} itemIndex a number that is the index of the clicked on user.
   */
  openModal = (itemIndex) => {
    this.setState({ open: true });
  };

  /**
   * closeModal closes the modal.
   */
  closeModal = () => {
    this.setState({ open: false });
  };

  /**
   * getDate converts the ISO string to the month, day, and year of the user's birth.
   * @param {*} date an ISO Date string.
   * @returns a converted date.
   */
  getDate = (date) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const iso = new Date(date);
    let monthName = months[iso.getMonth()];
    return monthName + " " + iso.getDate() + ", " + iso.getFullYear();
  };

  /**
   * When the component renders, the user information is fetched from the random
   * user generator api, and loading is set to false.
   */
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
    // classes allows access to the styles defined outside the class
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div>
          <Header></Header>
        </div>
        {this.state.loading && (
          <div className={classes.listBackground} flex={1}>
            <GridList
              cellHeight="auto"
              cols={3}
              spacing={20}
              flex={1}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Typography className={classes.nameText}>Loading...</Typography>
            </GridList>
          </div>
        )}
        {!this.state.loading && (
          <div>
            <div className={classes.listBackground} flex={1}>
              <SearchBar
                className={classes.search}
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
                  className={classes.list}
                >
                  {this.state.filter
                    ? this.filterSearch().length == 0
                      ? this.renderNoMatch()
                      : this.filterSearch().map((item) => (
                          <ListItem
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={20}
                            margin={1}
                            onMouseEnter={this.hover}
                            onMouseLeave={this.exitHover}
                            onClick={() => {
                              this.openModal();
                              this.setState({
                                itemIndex: this.state.items.indexOf(item),
                              });
                            }}
                            key={item.id.value}
                          >
                            <div>
                              <Avatar className={classes.listAvatar}>
                                <img src={item.picture.large} />
                              </Avatar>
                            </div>
                            <div className={classes.listInfoDiv}>
                              <Typography className={classes.listName}>
                                {item.name.first} {item.name.last}
                              </Typography>
                              <Typography className={classes.listInfo}>
                                {item.location.city}, {item.location.state}
                              </Typography>
                              <Typography className={classes.listInfo}>
                                {item.email}
                              </Typography>
                            </div>
                          </ListItem>
                        ))
                    : this.state.items.map((item) => (
                        <ListItem
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius={20}
                          margin={1}
                          onMouseEnter={this.hover}
                          onMouseLeave={this.exitHover}
                          onClick={() => {
                            this.openModal();
                            this.setState({
                              itemIndex: this.state.items.indexOf(item),
                            });
                          }}
                          key={item.id.value}
                        >
                          <div>
                            <Avatar className={classes.listAvatar}>
                              <img src={item.picture.large} />
                            </Avatar>
                          </div>
                          <div className={classes.listInfoDiv}>
                            <Typography className={classes.listName}>
                              {item.name.first} {item.name.last}
                            </Typography>
                            <Typography className={classes.listInfo}>
                              {item.location.city}, {item.location.state}
                            </Typography>
                            <Typography className={classes.listInfo}>
                              {item.email}
                            </Typography>
                          </div>
                        </ListItem>
                      ))}
                </GridList>
              </Fade>
            </div>
            <Modal
              open={this.state.open}
              onClose={this.closeModal}
              outline={0}
              style={{}}
              className={classes.modal}
            >
              <div>
                <Card className={classes.modalCard}>
                  <IconButton
                    className={classes.iconButtonRight}
                    onClick={() => {
                      this.closeModal();
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Avatar className={classes.listAvatar}>
                    <img
                      src={this.state.items[this.state.itemIndex].picture.large}
                    />
                  </Avatar>
                  <div className={classes.modalInfo}>
                    <Typography className={classes.nameText}>
                      {this.state.items[this.state.itemIndex].name.first}{" "}
                      {this.state.items[this.state.itemIndex].name.last}
                    </Typography>
                    <Typography className={classes.infoText}>
                      Born:{" "}
                      {this.getDate(
                        this.state.items[this.state.itemIndex].dob.date
                      )}
                    </Typography>
                    <Typography className={classes.infoText}>
                      {
                        this.state.items[this.state.itemIndex].location.street
                          .number
                      }{" "}
                      {
                        this.state.items[this.state.itemIndex].location.street
                          .name
                      }
                      , {this.state.items[this.state.itemIndex].location.city},{" "}
                      {this.state.items[this.state.itemIndex].location.state},{" "}
                      {this.state.items[this.state.itemIndex].location.postcode}
                    </Typography>
                  </div>
                  <Divider variant="middle" />
                  <div className={classes.modalInfo}>
                    <Typography className={classes.infoText}>
                      {this.state.items[this.state.itemIndex].email}
                    </Typography>
                    <Typography className={classes.infoText}>
                      {this.state.items[this.state.itemIndex].cell}
                    </Typography>
                  </div>
                  <div>
                    {!this.state.itemIndex == 0 && (
                      <IconButton
                        className={classes.iconButtonLeft}
                        onClick={() => {
                          this.setState({
                            itemIndex: this.state.itemIndex - 1,
                          });
                        }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    )}
                    {!(this.state.itemIndex == this.state.items.length - 1) && (
                      <IconButton
                        className={classes.iconButtonRight}
                        onClick={() => {
                          this.setState({
                            itemIndex: this.state.itemIndex + 1,
                          });
                        }}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    )}
                  </div>
                </Card>
              </div>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(App);
