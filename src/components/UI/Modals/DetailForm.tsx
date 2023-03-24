import Modal from '@material-ui/core/Modal';
import { useState, FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useFetching } from '../../../hooks/useFetching';

interface Props {
  show: boolean;
  handleClose: () => void;
  dataId: number;
  service: any;
}

const DetailForm: FC<Props> = ({ show, handleClose, dataId, service }) => {
  const [data, setData] = useState<any>([]);
  
  const {isLoading, errors, fetching: getDetails} = useFetching(async (limit: number, page: number, search: string) => {
    const response = await service.getById(limit, page, search);
    setData(response.data.data);
  })

  useEffect(() => {
    const data = getDetails(dataId);
    // @ts-ignore
    setData(data)
  }, [dataId]);
  
  const handleSave = () => {
    // Make API request to update data here
    handleClose();
  };

  return (
        <Modal  
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'azure',
              border: '2px solid #f1f1f1',
              borderRadius: 1, 
              boxShadow: 24,
              p: 4,
            }}

            >
              <table>
                <tr>
                  <td>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Details
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    </Typography>
                  </td>
                </tr>
              </table>

          </Box>
        </Modal>
  );
};

export default DetailForm;