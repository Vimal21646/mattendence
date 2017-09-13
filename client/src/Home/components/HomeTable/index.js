import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Table, Column, Cell } from 'fixed-data-table';
import { PacmanLoader } from 'react-spinners';
import moment from 'moment';

import Button from './../../../common/Button/index.js';
import TextBox from './../../../common/TextBox';
import './index.css';

class HomeTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      nameFilter: "",
      data: [],
      currentPage: 1,
      totalPage: 1,
      limitPage: 10,
      shownCount: 0,
      totalCount: 0,
      loading: true,
      today: moment(new Date()).format("YYYY-MM-DD")
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount(){
    // fetch data from an API here 
    if(!this.state.data.length){
      axios.get("/api/employee/all")
      .then(
        (res) => {    
          this.setState( { data: res.data} );
          this.setState( { currentPage: 1 })
          this.setState( { totalPage: Math.ceil(res.data.length / this.state.limitPage) })
          this.setState( { loading: false} );
        }, 
        (err) => {
          alert('An error occured! Try refreshing the page.', err);
        }
      );
    }
  }
  
  onFilterChange(event){
    var newFilter = event.target.value.toLowerCase();
    this.setState( { nameFilter: newFilter });
    this.setState( { currentPage: 1 });
  }

  decreasePage(){
    var currentPage = this.state.currentPage;
    currentPage--;
    if(currentPage > 0){
      this.setState( { currentPage: currentPage });
    }
  }

  increasePage(){
    var currentPage = this.state.currentPage;
    currentPage++;
    if(currentPage <= this.state.totalPage){
      this.setState( { currentPage: currentPage });
    }
  }

  markTodayEmployee(index, label){
    // mark employee today
    var date = this.state.today;
    axios.get("/api/employee/mark/"+this.state.data[index]._id+"/"+date+"/"+label)
    .then(
      (res) => {    
        alert('Recorded successfully!');
        var temp = this.state.data;
        if(!temp[index].attendances) temp[index].attendances = {};
        temp[index].attendances[date] = label;
        this.setState( { data: temp });
      }, 
      (err) => {
        alert('An error occured! Try again.', err);
      }
    );
  }

  markTodayAllEmployees(label){
    // mark all employee today
    var date = this.state.today;
    axios.get("/api/employee/all/mark/"+date+"/"+label)
    .then(
      (res) => {    
        alert('Recorded successfully!');
        var temp = this.state.data;
        temp.forEach((employee) => {
          if(!employee.attendances) employee.attendances = {};
          employee.attendances[date] = label;
        })
        this.setState( { data: temp });
      }, 
      (err) => {
        alert('An error occured! Try again.', err);
      }
    );
  }

  renderTable() {
    var totalCount = 0;
    var shownCount = 0;
    var lowerBound = 0;
    var upperBound = 0;
    var filtered = [];

    filtered = this.state.data.map( (row, i) => {
      if(row.name.toLowerCase().indexOf(this.state.nameFilter) > -1){
        var attd = row.attendances || {};
        var dates = [];
        dates.push(moment(this.state.today).subtract(6, 'days').format("YYYY-MM-DD"));
        dates.push(moment(this.state.today).subtract(5, 'days').format("YYYY-MM-DD"));
        dates.push(moment(this.state.today).subtract(4, 'days').format("YYYY-MM-DD"));
        dates.push(moment(this.state.today).subtract(3, 'days').format("YYYY-MM-DD"));
        dates.push(moment(this.state.today).subtract(2, 'days').format("YYYY-MM-DD"));
        dates.push(moment(this.state.today).subtract(1, 'days').format("YYYY-MM-DD"));
        dates.push(moment(this.state.today).subtract(0, 'days').format("YYYY-MM-DD"));
        return (
          <tr key={"employeeData"+i}>
            <td>{i+1}</td>
            <td>{row.name}</td>
            <td className=
                { attd[dates[0]] === "Vacation" ? "bg-info" 
                  : ( attd[dates[0]]  === "Present" ? "bg-success" 
                    : ( attd[dates[0]] === "Sick" ? "bg-warning" : "bg-danger")) }></td>
            <td className=
                { attd[dates[1]] === "Vacation" ? "bg-info" 
                  : ( attd[dates[1]]  === "Present" ? "bg-success" 
                    : ( attd[dates[1]] === "Sick" ? "bg-warning" : "bg-danger")) }></td>
            <td className=
                { attd[dates[2]] === "Vacation" ? "bg-info" 
                  : ( attd[dates[2]]  === "Present" ? "bg-success" 
                    : ( attd[dates[2]] === "Sick" ? "bg-warning" : "bg-danger")) }></td>
            <td className=
                { attd[dates[3]] === "Vacation" ? "bg-info" 
                  : ( attd[dates[3]]  === "Present" ? "bg-success" 
                    : ( attd[dates[3]] === "Sick" ? "bg-warning" : "bg-danger")) }></td>
            <td className=
                { attd[dates[4]] === "Vacation" ? "bg-info" 
                  : ( attd[dates[4]]  === "Present" ? "bg-success" 
                    : ( attd[dates[4]] === "Sick" ? "bg-warning" : "bg-danger")) }></td>
            <td className=
                { attd[dates[5]] === "Vacation" ? "bg-info" 
                  : ( attd[dates[5]]  === "Present" ? "bg-success" 
                    : ( attd[dates[5]] === "Sick" ? "bg-warning" : "bg-danger")) }></td>
            <td className=
                { attd[dates[6]] === "Vacation" ? "bg-info" 
                  : ( attd[dates[6]]  === "Present" ? "bg-success" 
                    : ( attd[dates[6]] === "Sick" ? "bg-warning" : "bg-danger")) }></td>
            <td>
              <Button 
                onClick={() => this.markTodayEmployee(i, "Present")} 
                className="btn btn-success"
                title="Present"
              > P
              </Button>
              <Button 
                onClick={() => this.markTodayEmployee(i, "Sick")} 
                className="btn btn-warning"
                title="Sick"
              > S
              </Button>
              <Button 
                onClick={() => this.markTodayEmployee(i, "Vacation")} 
                className="btn btn-info"
                title="Vacation"
              > V
              </Button>
              <Button 
                onClick={() => this.markTodayEmployee(i, "Absent")} 
                className="btn btn-danger"
                title="Absent"
              > A
              </Button>
              {/* <Button 
                onClick={(attd[this.state.today] === "Present") 
                          ? () => this.markTodayEmployee(i, "Absent")
                          : () => this.markTodayEmployee(i, "Present")} 
                className={(attd[this.state.today] === "Present") ? "btn btn-danger" : "btn btn-success" }
              >
                { (attd[this.state.today] === "Present" ? "Mark as absent today" : "Mark as present today") }
              </Button> */}
            </td>
          </tr>
        );
      } else {
        return undefined;
      }
    });
    var filteredTotalPage = this.state.totalPage;
    var filteredCurrentPage = this.state.currentPage;
    filtered = filtered.filter((row) => row !== undefined);
    totalCount = filtered.length;
    if(filtered.length > 0) {
      if(filtered.length > this.state.limitPage){
        lowerBound = (this.state.currentPage-1) * this.state.limitPage;
        upperBound = (this.state.currentPage) * this.state.limitPage;
        // console.log("getting from index", lowerBound, "to", lowerBound+this.state.limitPage);
        filtered = filtered.slice(lowerBound, upperBound);
      }
      filteredTotalPage = Math.ceil(totalCount / this.state.limitPage)
      shownCount = filtered.length;
      // return filtered;
    } else {
      filteredTotalPage = 1;
      filteredCurrentPage = 1;
      filtered = (
        <tr>
          <td colSpan="6"><em>No employee found</em></td>
        </tr>
      );
    }

    if(this.state.currentPage > filteredTotalPage) filteredCurrentPage = filteredTotalPage;

    var buttonIncrease = <Button className="btn" onClick={() => this.increasePage()}>&gt;</Button>;
    var buttonDecrease = <Button className="btn" onClick={() => this.decreasePage()}>&lt;</Button>;
    

    if(!this.state.loading)
      return (
        <div className="container">
          <div className="table-controls">
            <div>
              <Button className="btn btn-success" onClick={() => this.markTodayAllEmployees("Present")}>
                All present today
              </Button>
              <Button className="btn btn-danger" onClick={() => this.markTodayAllEmployees("Absent")}>
                All absent today
              </Button>
            </div>
            <TextBox placeholder="filter by name..." onChange={this.onFilterChange} value={this.state.nameFilter}/>
          </div>
          <div className="table-pagination">
            <div className="results">
              Showing {lowerBound+1}-{shownCount ? (lowerBound+shownCount) : 1} result from {totalCount} total results
            </div>
            <div className="pagination-buttons">
              {(this.state.currentPage > 1) ? buttonDecrease : ""}
              Page {filteredCurrentPage || this.state.currentPage} of { filteredTotalPage || this.state.totalPage}
              {(this.state.currentPage < filteredTotalPage) ? buttonIncrease : ""}
            </div>
          </div>
          <table className="attendance-table">
            <tbody>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>{moment(this.state.today).subtract(6, 'days').format("ddd, Do MMM")}</th>
              <th>{moment(this.state.today).subtract(5, 'days').format("ddd, Do MMM")}</th>
              <th>{moment(this.state.today).subtract(4, 'days').format("ddd, Do MMM")}</th>
              <th>{moment(this.state.today).subtract(3, 'days').format("ddd, Do MMM")}</th>
              <th>{moment(this.state.today).subtract(2, 'days').format("ddd, Do MMM")}</th>
              <th>{moment(this.state.today).subtract(1, 'days').format("ddd, Do MMM")}</th>
              <th>{moment(this.state.today).subtract(0, 'days').format("ddd, Do MMM")}</th>
              <th>Mark today as</th>
            </tr>
            { filtered }
            </tbody>
          </table>
        </div>
      );
  }

  render() {
    return (
      <div className="main-container">
        <div className="loader-container">
          <PacmanLoader
            color={'#444'} 
            loading={this.state.loading} 
          />
        </div>
        {this.renderTable()}
      </div>
    );
  }
}

export default HomeTable;
