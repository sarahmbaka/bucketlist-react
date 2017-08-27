
import React, {Component} from 'react';
import "./card.css";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import EditItem from '../edititem';
import DeleteItem from "../delete";


const BuckItems = (props) => (

  <div>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
        {
          props.items.map((bucketitem, index) => (

              <TableRow key={bucketitem.id}>
                <TableRowColumn>{ bucketitem.title }</TableRowColumn>
                <TableRowColumn>{ bucketitem.description }</TableRowColumn>
                <TableRowColumn>
                  <Link to={"/bucketlists/" + props.bucket_id +"/items/"+ bucketitem.id }>
                    <DeleteItem item_id={bucketitem.id} bucket_id={props.bucket_id} />
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={"/bucketlists/" + props.bucket_id +"/items/"+ bucketitem.id }>
                    <EditItem item_id={bucketitem.id} bucket_id={props.bucket_id} />

                  </Link>
                </TableRowColumn>

              </TableRow>

          ))
        }
          </TableBody>
      </Table>
    </div>

);

export default BuckItems;
