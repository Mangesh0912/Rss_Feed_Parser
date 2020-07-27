import React from 'react';
import '../styles/itemList.css';
import {pageSize} from '../common/constants';
import { toASCII } from 'punycode';

export interface IPaginationToolBarProps {
    totalRecordsCount: number;
    onPageChangeEvent(currentPageNumber: number): void;
}

export interface IPaginationToolBarState {
    displayNextButton: boolean;
    displayPrevButton: boolean;
    currentPageNumber: number;
    totalPageNumbers: number;
}

class PaginationToolbar extends React.Component<IPaginationToolBarProps, IPaginationToolBarState> {

    constructor(props: IPaginationToolBarProps, state: IPaginationToolBarState) {
            super(props);
            this.state = {
                  displayNextButton: true,
                  displayPrevButton: false,
                  currentPageNumber: 1,
                  totalPageNumbers: 1
            }
    }

    componentDidMount() {
        this.computeTotalPageNumbers();
    }

    computeTotalPageNumbers() {
          let totalPageNumbers: number = (this.props.totalRecordsCount) / pageSize;
          let roundedTotalPageNumbers = Number.parseInt(totalPageNumbers.toString());
          if(roundedTotalPageNumbers < totalPageNumbers) {
              totalPageNumbers = roundedTotalPageNumbers + 1;
          }
          console.log("Total records are :", this.props.totalRecordsCount)
          this.setState({totalPageNumbers: totalPageNumbers});
    }

    onClickNextBtn = () => {
           let {currentPageNumber, totalPageNumbers} = this.state;
           let newPageNo = currentPageNumber + 1;
           this.setState({currentPageNumber: newPageNo});

           if(newPageNo > 1) {
               this.setState({displayPrevButton: true});
           }
           if(newPageNo === totalPageNumbers) {
               this.setState({displayNextButton: false});
           }
           this.props.onPageChangeEvent(newPageNo);
    }

    onClickPrevBtn = () => {
        let {currentPageNumber, totalPageNumbers} = this.state;
        let newPageNo = currentPageNumber - 1;
        this.setState({currentPageNumber: newPageNo});

        if(newPageNo < totalPageNumbers) {
            this.setState({displayNextButton: true});
        }

        if(newPageNo === 1) {
            this.setState({displayPrevButton: false});
        }
        this.props.onPageChangeEvent(newPageNo);
    }

    render() {
        const {displayNextButton, displayPrevButton, currentPageNumber, totalPageNumbers} = this.state;
        return (
            <div className="pagination">
                 {(displayNextButton) && <input type="button" value="Next" onClick={this.onClickNextBtn}></input>}
                 {(displayPrevButton) &&  <input type="button" value="Previous" onClick={this.onClickPrevBtn}></input>}
                 &nbsp;&nbsp;
                 <span>Page No {currentPageNumber} of {totalPageNumbers}</span>
            </div>
        )
    }
}


export default PaginationToolbar;