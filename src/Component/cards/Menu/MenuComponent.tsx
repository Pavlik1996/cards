import * as React from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { DeletePackModal } from '../../packs/modals/delete-modal/DeletePackModal'
import { EditPackModal } from '../../packs/modals/edit-modal/EditPackModal'
import { selectorCardsPack_id, selectorPackName } from '../cards-selector'

export default function FadeMenu() {
  const navigate = useNavigate()
  const packName = useSelector(selectorPackName)
  const cardsPack_id = useSelector(selectorCardsPack_id)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onCLickHandler = () => navigate(`/learn/${cardsPack_id}`)

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem>
          <EditPackModal prevName={packName} id={cardsPack_id} />
          &nbsp;&nbsp;Edit
        </MenuItem>
        <MenuItem>
          <DeletePackModal prevName={packName} id={cardsPack_id} />
          &nbsp;&nbsp;Delete
        </MenuItem>
        <MenuItem>
          <SchoolIcon onClick={onCLickHandler} />
          &nbsp;&nbsp;Learn
        </MenuItem>
      </Menu>
    </div>
  )
}
