import React from 'react'
import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Input,
    Flex,
    IconButton,
    ButtonGroup,
     
    
  } from '@chakra-ui/react'
  import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Textarea,
  } from "@material-tailwind/react";
  import AccessibilityIcon from '@mui/icons-material/Accessibility';
  import CheckIcon from '@mui/icons-material/Check';
  import CloseIcon from '@mui/icons-material/Close';
  import EditIcon from '@mui/icons-material/Edit';
  import { useEditableControls, useControllableState } from '@chakra-ui/react'

export default function CustomControlsExample() {
    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm' display="flex">
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent='center'>
          <IconButton size='sm'icon={<EditIcon/>} {...getEditButtonProps()} />
        </Flex>
      )
    }
  
    return (
      <Card className="shadow-lg shadow-gray-500/10">
      <CardHeader className="relative h-56">
        <img
          alt="Card Image"
          src="/img/teamwork.jpeg"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody>
      <Editable
        textAlign='center'
        defaultValue='The Arctic Ocean freezes every winter and much of the
        sea-ice then thaws every summer, and that process will
        continue whatever happens.'
        fontSize='2xl'
        isPreviewFocusable={false}
      >
        <EditablePreview /><br></br>
        {/* Here is the custom input */}
        <Input as={EditableInput} width="400px"height="100px"/>
        <EditableControls />
      </Editable>
       
      </CardBody>
    </Card>
     
    )
  }