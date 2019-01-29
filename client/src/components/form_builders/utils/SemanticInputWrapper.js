import React from 'react';

export const SemanticInputWrapper = options => {
  const { key, label, inputOptions } = options;
  return (
    <div className="field" key={options.key}>
      <div className="ui input">
        <input {...inputOptions} />
      </div>
    </div>
  );
};
