package kr.co.adflow.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;

/**
 * Servlet implementation class FileUploader
 */
public class FileUploader extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FileUploader() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String ajaxUpdateResult = "";
		System.out.println("dopost..");
		try {
			System.out.println("step11..");
			List<FileItem> items = new ServletFileUpload(
					new DiskFileItemFactory()).parseRequest(request);
			System.out.println("step2..");
			for (FileItem item : items) {

				if (item.isFormField()) {
					System.out.println("step3..");

					ajaxUpdateResult += "Field " + item.getFieldName() +

					" with value: " + item.getString()
							+ " is successfully read\n\r";
					System.out.println("IF formField...");
					System.out.println(ajaxUpdateResult);
				} else {
					System.out.println("step4..");
					String fileName = item.getName();

					InputStream content = item.getInputStream();

					response.setContentType("text/plain");

					response.setCharacterEncoding("UTF-8");

					// Do whatever with the content InputStream.

					System.out.println(Streams.asString(content));

					ajaxUpdateResult += "File " + fileName
							+ " is successfully uploaded\n\r";
					System.out.println("else formField...");
					System.out.println(ajaxUpdateResult);

				
					 
					File file = new File("c://file//"+fileName);
					try {
						System.out.println("item to file");
						item.write(file);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		 
					System.out.println("Done");

				}

			}

		} catch (FileUploadException e) {

			throw new ServletException("Parsing file upload failed.", e);

		}

		response.getWriter().print(ajaxUpdateResult);
	}

}
