//RTE=Real Time Editor
import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
{
//see notes
// export default function RTE() {
//   return (
//     <Editor
//     initialValue='default value'
//     init={{
//         height: 500,
//         menubar: false,
//         plugins: [
//           'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//           'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//           'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//         ],
//         toolbar: 'undo redo | blocks | ' +
//           'bold italic forecolor | alignleft aligncenter ' +
//           'alignright alignjustify | bullist numlist outdent indent | ' +
//           'removeformat | help',
//         content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//       }}
//     />

//   )
// }
}
// *https://www.react-hook-form.com/api/usecontroller/
import {Controller} from 'react-hook-form'
//controller me el control hota hai, render hota hai and and onchange hota hai
//see the @PostForm.jsx
export default function RTE({name, control,label,defaultValue="", isDarkMode}){
  return (
    <div className="w-full">
      {label && <label className='inline-block mb-2 pl-1 text-gray-700 dark:text-gray-300'>{label}</label>}
      <div className="border border-violet-100 dark:border-gray-700 rounded-lg overflow-hidden">
        <Controller
          name={name||"content"}
          control={control}
          defaultValue={defaultValue}
          render={({field:{onChange, value}})=>(
            <Editor
                initialValue={defaultValue}
                apiKey='d89s4p9hww66g8ij8xrgbn0nl8wx632hbdtyeo9byarmv4cn'
                init={{
                    branding: false,
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: `
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            font-size: 16px;
                            color: #4B5563;
                        }
                        p { margin: 0; padding: 0; color: inherit; }
                    `,
                    skin: isDarkMode ? "oxide-dark" : "oxide",
                    content_css: isDarkMode ? "dark" : "default",
                  }}
                  onEditorChange={onChange}
                  value={value}
                />
          )}
        />
      </div>
    </div>
  )
}