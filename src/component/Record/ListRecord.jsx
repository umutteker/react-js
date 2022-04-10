import React, { Component } from "react";
import { headers } from "../../constants";
import ApiService from "../../service/ApiService";

class ListRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      filteredRecord: [],
    };
    this.reloadRecordList = this.reloadRecordList.bind(this);
  }

  componentDidMount() {
    this.reloadRecordList();
  }

  reloadRecordList() {
    ApiService.fetchRecords()
      .then((res) => {
        this.setState({ record: res.data, filteredRecord: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSearch = (e) => {
    const { record } = this.state;
    if (e.target.value !== null || e.target.value !== "") {
      this.setState({
        filteredRecord: record.filter(
          (f) =>
            f.plate.toUpperCase().includes(e.target.value.toUpperCase()) ||
            f.owner.toUpperCase().includes(e.target.value.toUpperCase())
        ),
      });
    } else {
      this.setState({ filteredRecord: record });
    }
  };

  onSort = (fieldName) => {
    const sortedRecords = this.state.filteredRecord.sort((a, b) => {
      return a[fieldName].localeCompare(b[fieldName]);
    });

    this.setState({ filteredRecord: sortedRecords });
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Record Details</h2>
        <div className="form-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search plate or owner"
            name="search"
            className="form-control"
            onChange={this.onSearch}
          />
        </div>
        <table className="table table-striped w-100">
          <thead>
            <tr>
              {headers.map((item) => (
                <th key={item.key}>
                  {item.title}{" "}
                  <span onClick={() => this.onSort(item.key)}>
                    <i className="bi bi-sort-down"></i>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.filteredRecord.length > 0
              ? this.state.filteredRecord.map((record) => (
                  <tr key={record.plate}>
                    <td>{record.plate}</td>
                    <td>{record.owner}</td>
                    <td>{record.start_date}</td>
                    <td>{record.end_date}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListRecord;
