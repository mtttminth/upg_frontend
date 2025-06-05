import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Dayjs } from 'dayjs';

export const useResponsive = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return isSmallScreen;
};

export const formatDate = (dateString: Dayjs) => {
  const day = dateString.format('DD');
  const month = dateString.format('MM');
  const year = dateString.format('YYYY');
  
  return `${day}-${month}-${year}`;
};

export const readableFormatDate = (dateString: string) => {
  // Create a new Date object from the input string
  var date = new Date(dateString);

  // Get month abbreviation
  var monthAbbreviation = date.toLocaleString('default', { month: 'short' });

  // Get the components of the date
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var amPM = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight

  // Format the date string
  var formattedDate = `${monthAbbreviation} ${day}, ${date.getFullYear()} ${hours}:${minutes} ${amPM}`;

  return formattedDate;
}

export const concatStrings = (text: string, limit: number) => {
  if (text?.length) {
    const truncated = limit && text.length > limit;
    let truncatedStrings = truncated ? text.slice(0, limit) : text;
    if (truncated) {
      truncatedStrings += ", ...";
    }
    return truncatedStrings;
  } else {
    return "—";
  }
}