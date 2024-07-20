import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface RoomNameProps {
  pageHref?: string;
  pageName?: string;
  roomName?: string;
}

const BasicBreadcrumbs: React.FC<RoomNameProps> = ({
  pageHref,
  pageName,
  roomName,
}) => {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        className="mb-3 md:mb-[18px] lg:mb-7 "
      >
        <Link className="body text-text" underline="hover" href="/">
          Home
        </Link>
        {pageHref && pageName && (
          <Link
            className="body text-text"
            underline="hover"
            href={`/${pageHref}`}
          >
            {pageName}
          </Link>
        )}
        {roomName && (
          <Typography className="body text-main">{roomName}</Typography>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BasicBreadcrumbs;
