import styled from 'styled-components';
import { withStyles, Dialog, List, ListItem } from '@material-ui/core';

export const StyledDialog = styled(Dialog)`
	
`

export const StyledList = styled(List)`
	width: 400px;
`

export const StyledListItem = withStyles({
	root: {
	  width: "200px"
	}
})(ListItem);