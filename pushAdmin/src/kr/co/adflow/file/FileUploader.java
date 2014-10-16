package kr.co.adflow.file;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
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
import org.apache.commons.io.FilenameUtils;

/**
 * Servlet implementation class FileUploader
 */
public class FileUploader extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static String imageUUid = "";

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
		InputStream content = null;
		try {
			System.out.println("step11..");
			List<FileItem> items = new ServletFileUpload(
					new DiskFileItemFactory()).parseRequest(request);

			System.out.println("step2..");
			for (FileItem item : items) {

				if (item.isFormField()) {

					if (item.getFieldName().equals("uuid")) {
						System.out.println("유유아이디가 존재?");
						System.out.println(item.getName());
						System.out.println(item.getString());
						imageUUid = item.getString();
						System.out.println(imageUUid);
						System.out.println("end.....");

					}
					System.out.println("step3..");

					ajaxUpdateResult += "Field " + item.getFieldName() +

					" with value: " + item.getString()
							+ " is successfully read\n\r";
					System.out.println("IF formField...");
					System.out.println(ajaxUpdateResult);
				}

			}

			for (FileItem item : items) {

				if (!item.isFormField()) {
					System.out.println("else debud start");
					System.out.println(imageUUid);
					System.out.println("debug end");
					String fileName = item.getName();

					String testResult = FilenameUtils.getName(fileName);
					System.out.println("test Result");
					System.out.println(testResult);
					content = item.getInputStream();

					response.setContentType("text/plain");

					response.setCharacterEncoding("UTF-8");

					// Do whatever with the content InputStream.

					System.out.println(Streams.asString(content));

					ajaxUpdateResult += "File " + fileName
							+ " is successfully uploaded\n\r";
					System.out.println("else formField...");
					System.out.println(ajaxUpdateResult);
					StringBuffer buffer = new StringBuffer();
					buffer.append(imageUUid);
					buffer.append(fileName);
					System.out.println(buffer.toString());

					File file = new File("/home/image/" + buffer.toString());
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

		} finally {

			if (content != null) {
				try {
					content.close();
				} catch (Exception e) {

				}

			}

		}

		response.getWriter().print(ajaxUpdateResult);
	}

}
