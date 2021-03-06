import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../../../actions';
import FormTemplate from './FormTemplate';
import Edit from './Edit';
import LoadingIndicator from '../../../helpers/LoadingIndicator';

const FormEdit = ({
  updateTask,
  data,
  isFetching,
  isError,
  setIsFormEditOpen,
  isDarkMode,
  id,
  title,
}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (data) {
      const { todos } = data;
      setTodos(todos);
    }
  }, [data]);

  const handleUpdate = (formValues) => {
    const {
      title,
      month,
      date,
      year,
      status,
      dueMonth,
      dueDate,
      dueYear,
      description,
    } = formValues;

    const monthdate = [month, date].join(' ');
    const createdate = [monthdate, year].join(', '); // January 1, 2022

    const duemonthdate = [dueMonth, dueDate].join(' ');
    const duedate = [duemonthdate, dueYear].join(', '); // January 1, 2022

    updateTask(id, title, createdate, status, duedate, description, todos);
    setIsFormEditOpen(false);
  };

  const renderForm = () => {
    if (isFetching || !data) {
      return <LoadingIndicator />;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data) {
      return (
        <FormTemplate
          type={title}
          data={data}
          edit={true}
          id={id}
          handleUpdate={handleUpdate}
          setIsFormEditOpen={setIsFormEditOpen}
          isDarkMode={isDarkMode}
        >
          <Edit
            isDarkMode={isDarkMode}
            todos={todos}
            setTodos={setTodos}
            id={id}
          />
        </FormTemplate>
      );
    }
  };

  return renderForm();
};

const mapStateToProps = (state) => {
  return {
    data: state.data.selectedTask,
    isFetching: state.data.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  updateTask,
})(FormEdit);
