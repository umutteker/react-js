import React, { Component } from "react";
import ApiService from "../../service/ApiService";

class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plate: "",
      owner: "",
      start_date: "",
      end_date: "",
      valid: true,
      errMessage: null,
    };
    this.addRecord = this.addRecord.bind(this);
  }

  addRecord = (e) => {
    e.preventDefault();
    let record = {
      plate: this.state.plate,
      owner: this.state.owner,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    if (record.plate !== "") {
      ApiService.addRecord(record)
        .then(() => {
          this.setState({ message: "Record added successfully." });
          this.props.history.push("/");
        })
        .catch((err) => {
          if (err.response.status !== 200) {
            this.setState({
              valid: false,
              errMessage: err.response.data.message,
            });
          }
        });
    } else {
      this.setState({ valid: false, errMessage: "Plate should be filled!!" });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

//   testFunt = () => {
//     const temp = { text: "asd", name: "asd", age: 12 };
//     const { name, ...others } = temp;
//     console.log(others);
//   };

  render() {
    const { plate, owner, start_date, end_date, valid, errMessage } =
      this.state;
    return (
      <div className="container">
        <h2 className="text-center">Add Record</h2>
        <form onSubmit={this.addRecord}>
          <div className="form-group">
            <label>
              Plate <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Plate Number"
              name="plate"
              className="form-control"
              value={plate}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Owner</label>
            <input
              type="text"
              placeholder="Owner"
              name="owner"
              className="form-control"
              value={owner}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              placeholder="Start Date"
              name="start_date"
              type="datetime-local"
              className="form-control"
              value={start_date}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              placeholder="End Date"
              name="end_date"
              type="datetime-local"
              className="form-control"
              value={end_date}
              onChange={this.onChange}
            />
          </div>
          {!valid && (
            <div class="alert alert-danger" role="alert">
              {errMessage}
            </div>
          )}
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default AddRecord;
